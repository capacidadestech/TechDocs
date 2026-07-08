import { Component, inject, signal } from '@angular/core';
import {
  DocumentStatus,
  DocumentType,
  STATUS_LABELS,
  TYPE_LABELS,
} from '../../models/document.model';
import { DocumentFilterService } from '../../services/document-filter.service';

/**
 * Filtros especializados (estado + tipo) como **popover** dentro del buscador,
 * en la barra de búsqueda. El botón muestra un punto cuando hay filtros activos; los
 * cambios se aplican en vivo sobre {@link DocumentFilterService}.
 */
@Component({
  selector: 'app-document-filters',
  templateUrl: './document-filters.html',
  styleUrl: './document-filters.scss',
})
export class DocumentFilters {
  protected readonly filters = inject(DocumentFilterService);
  protected readonly open = signal(false);

  protected readonly statusOptions = Object.entries(STATUS_LABELS) as [DocumentStatus, string][];
  protected readonly typeOptions = Object.entries(TYPE_LABELS) as [DocumentType, string][];

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onStatus(value: string): void {
    this.filters.setStatus(value as DocumentStatus | 'all');
  }

  protected onType(value: string): void {
    this.filters.setType(value as DocumentType | 'all');
  }
}
