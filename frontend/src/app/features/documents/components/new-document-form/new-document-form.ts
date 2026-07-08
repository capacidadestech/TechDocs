import { Component, computed, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../../../shared/components/modal/modal';
import { DocumentService } from '../../services/document.service';
import { FolderService } from '../../services/folder.service';
import { DocumentType, TYPE_LABELS } from '../../models/document.model';

/**
 * Modal de **subida de documento**: arrastra/elige un archivo y se derivan
 * nombre, tipo y tamaño del `File`; solo confirmas el directorio destino y, si
 * quieres, tags. En M1 el binario **no se persiste** (sin backend): se crea la
 * metadata en el {@link DocumentService}. El upload real llega en M2.
 */
@Component({
  selector: 'app-new-document-form',
  imports: [FormsModule, Modal],
  templateUrl: './new-document-form.html',
  styleUrl: './new-document-form.scss',
})
export class NewDocumentForm {
  private readonly documents = inject(DocumentService);
  private readonly folders = inject(FolderService);

  readonly close = output<void>();

  protected readonly file = signal<File | null>(null);
  protected readonly dragOver = signal(false);
  protected readonly folderId = signal(this.folders.selectedFolderId() ?? '');
  protected readonly tags = signal<string[]>([]);
  protected tagInput = '';

  /** Directorios disponibles, etiquetados con su ruta completa. */
  protected readonly folderOptions = computed(() =>
    this.folders.folders().map((f) => ({
      id: f.id,
      label: this.folders
        .path(f.id)
        .map((p) => p.name)
        .join(' / '),
    })),
  );

  // ----- Metadata derivada del archivo -----
  protected readonly fileName = computed(() => {
    const f = this.file();
    return f ? this.baseName(f.name) : '';
  });
  protected readonly fileTypeLabel = computed(() => {
    const f = this.file();
    return f ? TYPE_LABELS[this.fileType(f.name)] : '';
  });
  protected readonly fileSize = computed(() => {
    const f = this.file();
    return f ? this.formatSize(f.size) : '';
  });

  protected readonly canSubmit = computed(() => this.file() !== null && this.folderId() !== '');

  // ----- Selección de archivo (input + drag & drop) -----
  protected pick(files: FileList | null): void {
    const f = files?.item(0);
    if (f) this.file.set(f);
  }
  protected clearFile(): void {
    this.file.set(null);
  }
  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(true);
  }
  protected onDragLeave(): void {
    this.dragOver.set(false);
  }
  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    this.pick(event.dataTransfer?.files ?? null);
  }

  // ----- Tags -----
  protected addTag(): void {
    const tag = this.tagInput.trim().toLowerCase();
    if (tag && !this.tags().includes(tag)) this.tags.update((arr) => [...arr, tag]);
    this.tagInput = '';
  }
  protected removeTag(tag: string): void {
    this.tags.update((arr) => arr.filter((t) => t !== tag));
  }

  protected submit(): void {
    const file = this.file();
    const folderId = this.folderId();
    if (!file || !folderId) return;
    this.documents.create({
      name: this.baseName(file.name),
      folderId,
      type: this.fileType(file.name),
      tags: this.tags(),
      size: file.size,
      source: { kind: 'file', ref: file.name },
    });
    this.folders.select(folderId); // abrir el directorio destino para ver el alta
    this.close.emit();
  }

  protected cancel(): void {
    this.close.emit();
  }

  /** Nombre del documento = nombre del archivo sin extensión. */
  private baseName(filename: string): string {
    const dot = filename.lastIndexOf('.');
    return dot > 0 ? filename.slice(0, dot) : filename;
  }

  /** Deriva el tipo de documento de la extensión del archivo. */
  private fileType(filename: string): DocumentType {
    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(ext)) return 'docx';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return 'xlsx';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'img';
    return 'md';
  }

  /** Formatea bytes a B / KB / MB (igual que la app de referencia). */
  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
}
