import { Component, computed, inject } from '@angular/core';
import { FolderService } from '../../services/folder.service';

/**
 * Encabezado del panel de documentos: hace de **breadcrumb +
 * título**. Los ancestros son enlaces de retroceso y el nivel actual es el
 * título grande. Vive al inicio del contenido, pegado a las secciones que
 * navega. Consume {@link FolderService}.
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  private readonly folders = inject(FolderService);

  /** Ruta de carpetas desde la raíz hasta la activa (vacío ⇒ raíz). */
  private readonly trail = computed(() => {
    const id = this.folders.selectedFolderId();
    return id ? this.folders.path(id) : [];
  });

  /** Ancestros clicables (Inicio + carpetas previas); vacío en la raíz. */
  protected readonly ancestors = computed<{ id: string | null; name: string }[]>(() => {
    const trail = this.trail();
    if (trail.length === 0) return [];
    return [
      { id: null, name: 'Inicio' },
      ...trail.slice(0, -1).map((f) => ({ id: f.id, name: f.name })),
    ];
  });

  /** Título = nivel actual (o toda la biblioteca en la raíz). */
  protected readonly title = computed(() => this.trail().at(-1)?.name ?? 'Todos los documentos');

  protected select(id: string | null): void {
    this.folders.select(id);
  }
}
