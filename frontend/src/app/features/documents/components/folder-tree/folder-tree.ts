import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FolderNode } from '../folder-node/folder-node';
import { FolderService } from '../../services/folder.service';

/**
 * Árbol de carpetas del sidebar. Nace de un nodo raíz **"Inicio"**
 * (alineado con el breadcrumb): al pulsarlo se va a la raíz (`select(null)`) y su
 * chevron colapsa/expande todo el árbol. Debajo cuelgan las carpetas raíz como
 * {@link FolderNode} (recursivos). Permite crear una carpeta raíz inline.
 */
@Component({
  selector: 'app-folder-tree',
  imports: [FormsModule, FolderNode],
  templateUrl: './folder-tree.html',
  styleUrl: './folder-tree.scss',
})
export class FolderTree {
  private readonly folders = inject(FolderService);

  /** Carpetas de primer nivel (cuelgan de "Inicio"). */
  protected readonly roots = computed(() => this.folders.children(null));

  /** "Inicio" está activo cuando no hay carpeta seleccionada (vista raíz). */
  protected readonly isRootActive = computed(() => this.folders.selectedFolderId() === null);

  /** Estado del "expandir/colapsar todo" (en el servicio). */
  protected readonly allExpanded = this.folders.allExpanded;
  protected readonly hasExpandable = this.folders.hasExpandable;

  protected readonly adding = signal(false);
  protected newName = '';

  protected selectRoot(): void {
    this.folders.select(null);
  }

  /** Expande o colapsa todas las carpetas del árbol de una vez. */
  protected toggleAll(): void {
    if (this.folders.allExpanded()) this.folders.collapseAll();
    else this.folders.expandAll();
  }

  protected startAdd(): void {
    this.adding.set(true);
    this.newName = '';
  }

  protected confirmAdd(): void {
    const name = this.newName.trim();
    if (name) this.folders.addFolder(null, name);
    this.cancelAdd();
  }

  protected cancelAdd(): void {
    this.adding.set(false);
    this.newName = '';
  }
}
