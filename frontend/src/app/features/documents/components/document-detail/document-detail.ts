import { Component, computed, inject, input, output } from '@angular/core';
import { Modal } from '../../../../shared/components/modal/modal';
import { StatusBadge } from '../status-badge/status-badge';
import { FolderService } from '../../services/folder.service';
import { Document, STATUS_LABELS, TYPE_LABELS } from '../../models/document.model';

/** Modal de detalle (solo lectura) de un documento, sobre la {@link Modal} compartida. */
@Component({
  selector: 'app-document-detail',
  imports: [Modal, StatusBadge],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.scss',
})
export class DocumentDetail {
  private readonly folders = inject(FolderService);

  readonly doc = input.required<Document>();
  readonly close = output<void>();

  protected readonly statusLabel = computed(() => STATUS_LABELS[this.doc().status]);
  protected readonly typeLabel = computed(() => TYPE_LABELS[this.doc().type]);
  protected readonly folderPath = computed(
    () =>
      this.folders
        .path(this.doc().folderId)
        .map((f) => f.name)
        .join(' / ') || '—',
  );

  protected formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  protected formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
