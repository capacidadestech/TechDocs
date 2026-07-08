/**
 * Definición de una columna del {@link DataTable}.
 * Las columnas simples (`text`/`date`) se renderizan solas por config; las
 * columnas ricas (badges, iconos, acciones) usan una plantilla `appCellFor`.
 */
export interface TableColumn {
  /** Propiedad de la fila a mostrar (y clave del slot `appCellFor`). */
  key: string;
  /** Encabezado visible de la columna. */
  header: string;
  /** Alineación del contenido de la celda. Por defecto `start`. */
  align?: 'start' | 'center' | 'end';
  /** Ancho fijo opcional (ej. `'8rem'`). Si se omite, la columna es flexible. */
  width?: string;
  /** Formato incorporado para celdas simples. Por defecto `text`. */
  type?: 'text' | 'date';
}
