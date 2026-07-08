import { Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../../../shared/components/modal/modal';
import { DocumentService } from '../../services/document.service';
import { FolderService } from '../../services/folder.service';
import { Document } from '../../models/document.model';

/**
 * Modal de edición ligera de un documento (nombre, directorio, tags, descripción),
 * sobre la {@link Modal} compartida. Persiste con `DocumentService.update`.
 * El formulario completo (tipo/archivo) corresponde a M2.
 */
@Component({
  selector: 'app-edit-document-form',
  imports: [FormsModule, Modal],
  templateUrl: './edit-document-form.html',
  styleUrl: './edit-document-form.scss',
})
export class EditDocumentForm {
  private readonly documents = inject(DocumentService);
  private readonly folders = inject(FolderService);

  readonly doc = input.required<Document>();
  readonly close = output<void>();

  // Campos editables, prerellenados desde el documento (se resetean si cambia).
  protected readonly name = linkedSignal(() => this.doc().name);
  protected readonly folderId = linkedSignal(() => this.doc().folderId);
  protected readonly description = linkedSignal(() => this.doc().description ?? '');
  protected readonly tags = linkedSignal<string[]>(() => [...this.doc().tags]);
  protected tagInput = '';

  protected readonly folderOptions = computed(() =>
    this.folders.folders().map((f) => ({
      id: f.id,
      label: this.folders
        .path(f.id)
        .map((p) => p.name)
        .join(' / '),
    })),
  );

  protected readonly canSave = computed(() => this.name().trim() !== '' && this.folderId() !== '');

  protected addTag(): void {
    const tag = this.tagInput.trim().toLowerCase();
    if (tag && !this.tags().includes(tag)) this.tags.update((arr) => [...arr, tag]);
    this.tagInput = '';
  }

  protected removeTag(tag: string): void {
    this.tags.update((arr) => arr.filter((t) => t !== tag));
  }

  protected save(): void {
    if (!this.canSave()) return;
    this.documents.update(this.doc().id, {
      name: this.name().trim(),
      folderId: this.folderId(),
      tags: this.tags(),
      description: this.description().trim() || undefined,
    });
    this.folders.select(this.folderId());
    this.close.emit();
  }
}
