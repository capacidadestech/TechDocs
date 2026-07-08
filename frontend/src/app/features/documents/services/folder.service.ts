import { computed, inject, Injectable, signal } from '@angular/core';
import { Folder } from '../models/folder.model';
import { DocumentService } from './document.service';

/**
 * Árbol de carpetas de la biblioteca y carpeta seleccionada. En M1 sirve datos
 * **mock** en memoria (adjacency list por `parentId`); en M2 se alimenta de la
 * API (paginado/keyset) **sin cambiar los componentes** — ver
 * `modelo-documental.md` §9.
 */
@Injectable({ providedIn: 'root' })
export class FolderService {
  private readonly documentService = inject(DocumentService);

  private readonly _folders = signal<Folder[]>(MOCK_FOLDERS);
  private readonly _selectedFolderId = signal<string | null>(null);
  /** Ids de carpetas expandidas en el árbol del sidebar. */
  private readonly _expanded = signal<ReadonlySet<string>>(new Set<string>());

  /** Lista plana de carpetas (el árbol se deriva con `children()`). */
  readonly folders = this._folders.asReadonly();

  /** Carpeta actualmente abierta (`null` ⇒ raíz "Biblioteca"). */
  readonly selectedFolderId = this._selectedFolderId.asReadonly();

  /** Ids de carpetas que tienen subcarpetas (las únicas expandibles). */
  private readonly expandableIds = computed(
    () =>
      new Set(
        this._folders()
          .filter((f) => f.parentId !== null)
          .map((f) => f.parentId!),
      ),
  );

  /** Hay al menos una carpeta con subcarpetas (habilita el "expandir/colapsar todo"). */
  readonly hasExpandable = computed(() => this.expandableIds().size > 0);

  /** Todas las carpetas expandibles están expandidas. */
  readonly allExpanded = computed(() => {
    const expandable = this.expandableIds();
    if (expandable.size === 0) return false;
    const expanded = this._expanded();
    for (const id of expandable) if (!expanded.has(id)) return false;
    return true;
  });

  /** Subcarpetas directas de `parentId` (`null` ⇒ carpetas raíz). */
  children(parentId: string | null): Folder[] {
    return this._folders().filter((f) => f.parentId === parentId);
  }

  /** Ruta desde la raíz hasta `folderId` (para el breadcrumb). */
  path(folderId: string): Folder[] {
    const byId = new Map(this._folders().map((f) => [f.id, f]));
    const trail: Folder[] = [];
    let current = byId.get(folderId);
    while (current) {
      trail.unshift(current);
      current = current.parentId ? byId.get(current.parentId) : undefined;
    }
    return trail;
  }

  /** Abre una carpeta (o vuelve a la raíz con `null`). */
  select(folderId: string | null): void {
    this._selectedFolderId.set(folderId);
  }

  // ----- Expansión del árbol (sidebar) -----

  isExpanded(id: string): boolean {
    return this._expanded().has(id);
  }

  toggleExpanded(id: string): void {
    this._expanded.update((set) => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /** Marca una carpeta como expandida (idempotente). */
  expand(id: string): void {
    this._expanded.update((set) => (set.has(id) ? set : new Set(set).add(id)));
  }

  /** Expande todas las carpetas con subcarpetas. */
  expandAll(): void {
    this._expanded.set(new Set(this.expandableIds()));
  }

  /** Colapsa todo el árbol. */
  collapseAll(): void {
    this._expanded.set(new Set<string>());
  }

  /** Crea una subcarpeta bajo `parentId` (`null` ⇒ carpeta raíz). */
  addFolder(parentId: string | null, name: string): void {
    const folder: Folder = {
      id: crypto.randomUUID(),
      name: name.trim(),
      parentId,
      createdAt: new Date().toISOString(),
    };
    this._folders.update((folders) => [...folders, folder]);
  }

  /** Renombra una carpeta. */
  rename(id: string, name: string): void {
    this._folders.update((folders) =>
      folders.map((f) => (f.id === id ? { ...f, name: name.trim() } : f)),
    );
  }

  /** Nº de documentos albergados directamente por la carpeta (contador del árbol). */
  docCount(id: string): number {
    return this.documentService.documents().filter((d) => d.folderId === id).length;
  }

  /** Color decorativo estable de una carpeta (derivado del id, para el icono). */
  color(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return FOLDER_COLORS[hash % FOLDER_COLORS.length];
  }

  /** `true` si la carpeta no tiene subcarpetas ni documentos (se puede borrar). */
  isEmpty(id: string): boolean {
    const hasSubfolders = this._folders().some((f) => f.parentId === id);
    const hasDocuments = this.documentService.documents().some((d) => d.folderId === id);
    return !hasSubfolders && !hasDocuments;
  }

  /**
   * Elimina una carpeta. En M1 se **bloquea** si no está vacía (pide vaciarla);
   * el borrado en cascada/papelera se decide en M2 (§4.4). Devuelve `false` si
   * no se pudo eliminar.
   */
  remove(id: string): boolean {
    if (!this.isEmpty(id)) return false;
    this._folders.update((folders) => folders.filter((f) => f.id !== id));
    if (this._selectedFolderId() === id) this._selectedFolderId.set(null);
    return true;
  }
}

/** Paleta decorativa para los iconos de carpeta (colores semánticos, fijos). */
const FOLDER_COLORS = [
  '#e0a458', // ámbar
  '#6cae75', // verde
  '#5b8fb9', // azul
  '#b07bac', // malva
  '#d97b66', // terracota
  '#4cae9e', // turquesa
  '#c9a13b', // mostaza
  '#8a83d6', // lavanda
];

const MOCK_FOLDERS: Folder[] = [
  { id: 'documentacion', name: 'Documentación', parentId: null, createdAt: '2026-01-10T09:00:00Z' },
  { id: 'api', name: 'API', parentId: 'documentacion', createdAt: '2026-01-12T09:00:00Z' },
  { id: 'api-v1', name: 'v1', parentId: 'api', createdAt: '2026-01-12T09:10:00Z' },
  { id: 'api-v2', name: 'v2', parentId: 'api', createdAt: '2026-03-01T09:00:00Z' },
  { id: 'guias', name: 'Guías', parentId: 'documentacion', createdAt: '2026-01-15T09:00:00Z' },
  {
    id: 'arquitectura',
    name: 'Arquitectura',
    parentId: 'documentacion',
    createdAt: '2026-02-01T09:00:00Z',
  },
  { id: 'producto', name: 'Producto', parentId: null, createdAt: '2026-01-20T09:00:00Z' },
  { id: 'releases', name: 'Releases', parentId: 'producto', createdAt: '2026-02-10T09:00:00Z' },
  { id: 'finanzas', name: 'Finanzas', parentId: null, createdAt: '2026-01-22T09:00:00Z' },
  { id: 'diseno', name: 'Diseño', parentId: null, createdAt: '2026-01-25T09:00:00Z' },
  { id: 'seguridad', name: 'Seguridad', parentId: null, createdAt: '2026-01-28T09:00:00Z' },
  {
    id: 'infraestructura',
    name: 'Infraestructura',
    parentId: null,
    createdAt: '2026-02-05T09:00:00Z',
  },
  { id: 'plantillas', name: 'Plantillas', parentId: null, createdAt: '2026-02-08T09:00:00Z' },
];
