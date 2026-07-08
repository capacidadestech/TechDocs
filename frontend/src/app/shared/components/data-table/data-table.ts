import { Component, contentChildren, input, TemplateRef } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { CellFor } from './cell-for.directive';
import { TableColumn } from './table-column';

/**
 * Tabla de datos **genérica y reutilizable**.
 *
 * - Las columnas se declaran por config (`[columns]`) y los datos por `[rows]`.
 * - Las celdas simples se formatean por `type` (`text`/`date`); las celdas
 *   ricas se proyectan con `<ng-template appCellFor="key">`.
 * - Sin acoplamiento al dominio: sirve para documentos, usuarios, logs, etc.
 */
@Component({
  selector: 'app-data-table',
  imports: [DatePipe, NgTemplateOutlet],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  readonly columns = input.required<TableColumn[]>();
  readonly rows = input.required<readonly unknown[]>();
  /** Propiedad usada como identidad de fila para `track`. Por defecto `id`. */
  readonly trackKey = input<string>('id');
  /** Mensaje cuando no hay filas que mostrar. */
  readonly emptyMessage = input<string>('No hay resultados.');

  private readonly cells = contentChildren(CellFor);

  /** Plantilla `appCellFor` para una columna, si el consumidor la proporcionó. */
  protected templateFor(key: string): TemplateRef<{ $implicit: unknown }> | null {
    return this.cells().find((c) => c.column() === key)?.template ?? null;
  }

  /** Valor crudo de una celda (`row[key]`). */
  protected value(row: unknown, key: string): unknown {
    return (row as Record<string, unknown>)[key];
  }

  /** Valor de una celda tipado para el `DatePipe`. */
  protected dateValue(row: unknown, key: string): string | number | Date | null {
    return (row as Record<string, unknown>)[key] as string | number | Date | null;
  }

  /** Identidad de fila para `track`. */
  protected rowKey(row: unknown): unknown {
    return (row as Record<string, unknown>)[this.trackKey()];
  }
}
