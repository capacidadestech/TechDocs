import { Directive, inject, input, TemplateRef } from '@angular/core';

/**
 * Marca una `<ng-template>` como la plantilla de celda para una columna del
 * {@link DataTable}, identificada por su `key`.
 *
 * @example
 * <ng-template appCellFor="status" let-row>
 *   <app-status-badge [status]="row.status" />
 * </ng-template>
 */
@Directive({
  selector: 'ng-template[appCellFor]',
})
export class CellFor {
  /** Clave de la columna a la que pertenece esta plantilla de celda. */
  readonly column = input.required<string>({ alias: 'appCellFor' });

  /**
   * La plantilla de la celda (la `<ng-template>` anfitriona). El contexto
   * `$implicit` (la fila) se tipa laxo a propósito: la tabla es genérica y el
   * consumidor accede a las propiedades de su propio modelo en la plantilla.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly template = inject<TemplateRef<{ $implicit: any }>>(TemplateRef);
}
