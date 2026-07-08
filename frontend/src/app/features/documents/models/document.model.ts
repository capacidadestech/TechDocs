/**
 * Modelo de dominio de un documento de la biblioteca.
 * En M2 estos datos vendrán de la API NestJS; en M1 se sirven mock.
 */

export type DocumentType = 'pdf' | 'docx' | 'md' | 'xlsx' | 'img';

export type DocumentStatus = 'published' | 'draft' | 'review' | 'archived';

/**
 * Origen del documento: un archivo subido (`file`) o contenido escrito
 * directamente (`content`). En M1 el mock usa `file` con metadata; en M2 el
 * formulario aporta el binario o el contenido real.
 */
export interface DocumentSource {
  kind: 'file' | 'content';
  ref?: string; // ruta/clave del binario (kind 'file')
  content?: string; // texto escrito (kind 'content')
}

export interface Document {
  id: string;
  name: string;
  /** **Hogar** del documento: id de la carpeta que lo alberga (obligatorio). */
  folderId: string;
  type: DocumentType;
  status: DocumentStatus;
  author: string;
  uploadedAt: string; // fecha de carga (ISO)
  updatedAt: string; // última modificación (ISO)
  size: number; // bytes
  tags: string[];
  source: DocumentSource;
  description?: string;
}

/**
 * Datos que aporta el usuario al **crear** un documento (Reactive Form, §4.3).
 * El resto de metadata (`status`, `uploadedAt`, `updatedAt`, `author`, `size`)
 * la deriva el servicio. `type` se derivará del archivo en M2.
 */
export interface NewDocument {
  name: string;
  folderId: string;
  type: DocumentType;
  tags: string[];
  size?: number; // bytes del archivo subido (M1: derivado del File en cliente)
  description?: string;
  source?: DocumentSource;
}

/** Etiquetas en español para el estatus (UI). */
export const STATUS_LABELS: Record<DocumentStatus, string> = {
  published: 'Publicado',
  draft: 'Borrador',
  review: 'En revisión',
  archived: 'Archivado',
};

/** Etiquetas en español para el tipo de archivo (UI). */
export const TYPE_LABELS: Record<DocumentType, string> = {
  pdf: 'PDF',
  docx: 'Word',
  md: 'Markdown',
  xlsx: 'Excel',
  img: 'Imagen',
};
