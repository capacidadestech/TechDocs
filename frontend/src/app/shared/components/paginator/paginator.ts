import { Component, computed, input, output } from '@angular/core';

/**
 * Paginador **reutilizable** (dumb): selector de tamaño de página, rango
 * "desde–hasta de total" y navegación con páginas numeradas (+ elipsis).
 * No conoce los datos; el padre escucha `pageChange`/`pageSizeChange`.
 */
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator {
  readonly total = input.required<number>();
  readonly page = input.required<number>(); // 1-based
  readonly pageSize = input.required<number>();
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );
  protected readonly from = computed(() =>
    this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1,
  );
  protected readonly to = computed(() => Math.min(this.page() * this.pageSize(), this.total()));

  /** Secuencia de páginas a mostrar, con elipsis (`'…'`) cuando hay muchas. */
  protected readonly pages = computed<(number | '…')[]>(() => {
    const total = this.totalPages();
    const current = this.page();
    const out: (number | '…')[] = [1];
    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);
    if (left > 2) out.push('…');
    for (let i = left; i <= right; i++) out.push(i);
    if (right < total - 1) out.push('…');
    if (total > 1) out.push(total);
    return out;
  });

  protected goTo(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.page()) {
      this.pageChange.emit(page);
    }
  }

  protected changeSize(value: string): void {
    this.pageSizeChange.emit(Number(value));
  }
}
