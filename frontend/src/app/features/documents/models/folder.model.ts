/**
 * Modelo de dominio de una carpeta de la biblioteca.
 *
 * Las carpetas forman un **árbol** por auto-referencia (`parentId`): una carpeta
 * con `parentId === null` es raíz (cuelga de la "Biblioteca" conceptual). Es el
 * **hogar único** de un documento (ver `Document.folderId`).
 *
 * En M1 se sirven mock en memoria; en M2 se persisten en PostgreSQL
 * (adjacency list `parent_id` + materialized path). Ver
 * `docs/architecture/modelo-documental.md` §2 y §10.
 */
export interface Folder {
  id: string;
  name: string;
  /** `null` ⇒ carpeta raíz. La auto-referencia forma el árbol. */
  parentId: string | null;
  createdAt: string; // ISO date
}
