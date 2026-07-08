import { Component, computed, effect, inject, signal } from '@angular/core';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { DataTable } from '../../../../shared/components/data-table/data-table';
import { CellFor } from '../../../../shared/components/data-table/cell-for.directive';
import { TableColumn } from '../../../../shared/components/data-table/table-column';
import { Paginator } from '../../../../shared/components/paginator/paginator';
import { StatusBadge } from '../../components/status-badge/status-badge';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { FolderCards } from '../../components/folder-cards/folder-cards';
import { NewDocumentForm } from '../../components/new-document-form/new-document-form';
import { DocumentDetail } from '../../components/document-detail/document-detail';
import { EditDocumentForm } from '../../components/edit-document-form/edit-document-form';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { DocumentService } from '../../services/document.service';
import { FolderService } from '../../services/folder.service';
import { DocumentFilterService } from '../../services/document-filter.service';
import { Document, TYPE_LABELS } from '../../models/document.model';

/**
 * Listado de documentos (smart). Orquesta datos del {@link DocumentService},
 * filtra y pagina de forma reactiva (`computed()`), y presenta el resultado en
 * la {@link DataTable} reutilizable con su {@link Paginator}.
 *
 * Las acciones por fila abren modales ligeros (ver / editar / eliminar) sobre el
 * mock; el detalle/edición completos por ruta llegan en M2.
 */
@Component({
  selector: 'app-document-list',
  imports: [
    EmptyState,
    DataTable,
    CellFor,
    StatusBadge,
    Breadcrumb,
    FolderCards,
    Paginator,
    NewDocumentForm,
    DocumentDetail,
    EditDocumentForm,
    ConfirmDialog,
  ],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss',
})
export class DocumentList {
  private readonly documentService = inject(DocumentService);
  private readonly folderService = inject(FolderService);
  private readonly filters = inject(DocumentFilterService);

  constructor() {
    // Al cambiar de carpeta o de criterios (búsqueda/filtros), volver a la página 1.
    effect(() => {
      this.folderService.selectedFolderId();
      this.filters.term();
      this.filters.status();
      this.filters.type();
      this.page.set(1);
    });
  }

  // ----- Paginación -----
  protected readonly page = signal(1);
  protected readonly pageSize = signal(5);

  /** Modales: nuevo documento + acciones por fila (ver / editar / eliminar). */
  protected readonly showCreate = signal(false);
  protected readonly viewDoc = signal<Document | null>(null);
  protected readonly editDoc = signal<Document | null>(null);
  protected readonly deleteDoc = signal<Document | null>(null);

  protected openCreate(): void {
    this.showCreate.set(true);
  }

  /** Hay documentos en la fuente (independiente de los filtros). */
  protected readonly hasDocuments = computed(() => this.documentService.documents().length > 0);

  /** Documentos tras aplicar carpeta activa + búsqueda + estatus + tipo. */
  protected readonly filtered = computed(() => {
    const term = this.filters.term().trim().toLowerCase();
    const status = this.filters.status();
    const type = this.filters.type();
    const folderId = this.folderService.selectedFolderId(); // null ⇒ toda la biblioteca
    return this.documentService
      .documents()
      .filter(
        (d) =>
          (folderId === null || d.folderId === folderId) &&
          (status === 'all' || d.status === status) &&
          (type === 'all' || d.type === type) &&
          (term === '' || d.name.toLowerCase().includes(term)),
      );
  });

  protected readonly total = computed(() => this.filtered().length);
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );

  /** Porción visible de la página actual. */
  protected readonly paged = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  protected readonly columns: TableColumn[] = [
    { key: 'status', header: '', width: '3.5rem', align: 'center' },
    { key: 'name', header: 'Nombre' },
    { key: 'folder', header: 'Directorio', width: '11rem' },
    { key: 'tags', header: 'Tags', width: '13rem' },
    { key: 'type', header: 'Tipo', width: '7rem' },
    { key: 'uploadedAt', header: 'Fecha de carga', type: 'date', width: '10rem' },
    { key: 'actions', header: '', align: 'end', width: '8rem' },
  ];

  protected onPageSize(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
  }

  /** Etiqueta legible del tipo de archivo de un documento. */
  protected typeLabel(doc: Document): string {
    return TYPE_LABELS[doc.type];
  }

  /** Nombre de la carpeta que alberga al documento (subtítulo de la celda Nombre). */
  protected folderName(doc: Document): string {
    return this.folderService.folders().find((f) => f.id === doc.folderId)?.name ?? '—';
  }

  /** Abre el detalle (solo lectura) del documento. */
  protected view(doc: Document): void {
    this.viewDoc.set(doc);
  }

  /** Abre el formulario de edición ligera. */
  protected edit(doc: Document): void {
    this.editDoc.set(doc);
  }

  /** Pide confirmación antes de eliminar. */
  protected remove(doc: Document): void {
    this.deleteDoc.set(doc);
  }

  /** Confirma el borrado del documento pendiente. */
  protected confirmDelete(): void {
    const doc = this.deleteDoc();
    if (!doc) return;
    this.documentService.remove(doc.id);
    this.deleteDoc.set(null);
    // Si la página quedó fuera de rango tras eliminar, retrocede a la última válida.
    if (this.page() > this.totalPages()) this.page.set(this.totalPages());
  }
}
