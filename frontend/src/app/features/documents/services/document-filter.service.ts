import { computed, Injectable, signal } from '@angular/core';
import { DocumentStatus, DocumentType } from '../models/document.model';

/**
 * Criterios de búsqueda y filtrado de documentos, compartidos entre el
 * **buscador del header** (término + popover de filtros) y el **listado** (los
 * consume para filtrar). Vive en un servicio porque ambos están en árboles
 * distintos (layout vs página).
 */
@Injectable({ providedIn: 'root' })
export class DocumentFilterService {
  /** Texto de búsqueda por nombre. */
  readonly term = signal('');

  private readonly _status = signal<DocumentStatus | 'all'>('all');
  private readonly _type = signal<DocumentType | 'all'>('all');

  readonly status = this._status.asReadonly();
  readonly type = this._type.asReadonly();

  /** Hay algún filtro especializado activo (estado o tipo) → marca el icono. */
  readonly hasActiveFilters = computed(() => this._status() !== 'all' || this._type() !== 'all');

  setStatus(value: DocumentStatus | 'all'): void {
    this._status.set(value);
  }

  setType(value: DocumentType | 'all'): void {
    this._type.set(value);
  }

  /** Limpia los filtros especializados (no toca el término de búsqueda). */
  clearFilters(): void {
    this._status.set('all');
    this._type.set('all');
  }
}
