import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Folder } from '../../models/folder.model';
import { FolderService } from '../../services/folder.service';

/**
 * Nodo recursivo del árbol de carpetas (sidebar). Renderiza una carpeta y, al
 * expandirla, sus subcarpetas como nuevos `app-folder-node` (auto-referencia).
 * Navega con clic (`select`), expande/colapsa y permite crear subcarpeta inline.
 *
 * Es "dumb de feature": no conoce rutas; solo opera sobre {@link FolderService}.
 */
@Component({
  selector: 'app-folder-node',
  imports: [FormsModule, FolderNode],
  templateUrl: './folder-node.html',
  styleUrl: './folder-node.scss',
})
export class FolderNode {
  private readonly folders = inject(FolderService);

  readonly folder = input.required<Folder>();

  /** Nivel de anidación (para la sangría); la raíz lo pasa como 0. */
  readonly depth = input(0);

  protected readonly adding = signal(false);
  protected newName = '';

  /** Subcarpetas directas (reactivo a altas/bajas). */
  protected readonly children = computed(() => this.folders.children(this.folder().id));
  protected readonly hasChildren = computed(() => this.children().length > 0);
  protected readonly isActive = computed(
    () => this.folders.selectedFolderId() === this.folder().id,
  );
  /** Expansión compartida en el servicio (permite expandir/colapsar todo). */
  protected readonly expanded = computed(() => this.folders.isExpanded(this.folder().id));

  protected docCount(): number {
    return this.folders.docCount(this.folder().id);
  }

  /** Color decorativo del icono de la carpeta. */
  protected folderColor(): string {
    return this.folders.color(this.folder().id);
  }

  /** Clic en la carpeta: abrirla (y expandir si tiene hijas). */
  protected open(): void {
    this.folders.select(this.folder().id);
    if (this.hasChildren()) this.folders.expand(this.folder().id);
  }

  protected toggle(event: Event): void {
    event.stopPropagation();
    this.folders.toggleExpanded(this.folder().id);
  }

  protected startAdd(event: Event): void {
    event.stopPropagation();
    this.folders.expand(this.folder().id);
    this.adding.set(true);
    this.newName = '';
  }

  protected confirmAdd(): void {
    const name = this.newName.trim();
    if (name) this.folders.addFolder(this.folder().id, name);
    this.cancelAdd();
  }

  protected cancelAdd(): void {
    this.adding.set(false);
    this.newName = '';
  }

  protected remove(event: Event): void {
    event.stopPropagation();
    if (!this.folders.remove(this.folder().id)) {
      // M1: bloqueado si no está vacía; el soft-delete/papelera llega en M2.
      alert('La carpeta no está vacía. Vacíala antes de eliminarla.');
    }
  }
}
