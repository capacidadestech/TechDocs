import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FolderService } from '../../services/folder.service';

/**
 * Sección "Carpetas" del panel central (navegación por carpetas): muestra las
 * subcarpetas de la carpeta activa como tarjetas navegables en un **carrusel**
 * con flechas laterales (se deshabilitan en los extremos). Si la carpeta actual
 * no tiene subcarpetas, no renderiza nada.
 */
@Component({
  selector: 'app-folder-cards',
  templateUrl: './folder-cards.html',
  styleUrl: './folder-cards.scss',
})
export class FolderCards {
  private readonly folders = inject(FolderService);
  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  /** Subcarpetas de la carpeta activa (o las raíz si estamos en la Biblioteca). */
  protected readonly subfolders = computed(() =>
    this.folders.children(this.folders.selectedFolderId()),
  );

  /** Habilitación de las flechas según la posición del scroll. */
  protected readonly canPrev = signal(false);
  protected readonly canNext = signal(false);

  constructor() {
    // Recalcula las flechas cuando cambian las subcarpetas (tras pintar el DOM).
    effect(() => {
      this.subfolders();
      requestAnimationFrame(() => this.updateArrows());
    });
  }

  protected docCount(id: string): number {
    return this.folders.docCount(id);
  }

  protected open(id: string): void {
    this.folders.select(id);
  }

  /** Desplaza el carrusel ~80% del ancho visible en la dirección indicada. */
  protected scroll(dir: -1 | 1): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  protected updateArrows(): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    this.canPrev.set(el.scrollLeft > 1);
    this.canNext.set(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }
}
