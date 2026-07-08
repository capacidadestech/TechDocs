import { Injectable, signal } from '@angular/core';
import { Document, NewDocument } from '../models/document.model';

/**
 * Fuente de datos de documentos. En M1 sirve datos **mock** en memoria;
 * en M2 se reemplaza la implementación por llamadas HTTP a la API NestJS
 * (la interfaz pública se mantiene — ver `modelo-documental.md` §9).
 */
@Injectable({ providedIn: 'root' })
export class DocumentService {
  private readonly _documents = signal<Document[]>(MOCK_DOCUMENTS);

  /** Listado reactivo de documentos (solo lectura para los consumidores). */
  readonly documents = this._documents.asReadonly();

  /**
   * Crea un documento en la carpeta indicada. La metadata se deriva aquí
   * (`status='draft'`, fechas = ahora, `size=0` hasta tener binario en M2);
   * el usuario solo aporta nombre, tipo, tags y descripción.
   */
  create(input: NewDocument): void {
    const now = new Date().toISOString();
    const doc: Document = {
      id: cryptoId(),
      name: input.name,
      folderId: input.folderId,
      type: input.type,
      status: 'draft',
      author: 'José Velosa', // M3: usuario autenticado
      uploadedAt: now,
      updatedAt: now,
      size: input.size ?? 0,
      tags: input.tags,
      source: input.source ?? { kind: 'content' },
      description: input.description,
    };
    this._documents.update((docs) => [doc, ...docs]);
  }

  /** Actualiza campos editables de un documento (nombre, carpeta, tags, descripción). */
  update(
    id: string,
    changes: Partial<Pick<Document, 'name' | 'folderId' | 'tags' | 'description'>>,
  ): void {
    this._documents.update((docs) =>
      docs.map((d) =>
        d.id === id ? { ...d, ...changes, updatedAt: new Date().toISOString() } : d,
      ),
    );
  }

  /** Mueve un documento a otra carpeta (acción "Mover a…", §4.4). */
  move(id: string, folderId: string): void {
    this._documents.update((docs) =>
      docs.map((d) => (d.id === id ? { ...d, folderId, updatedAt: new Date().toISOString() } : d)),
    );
  }

  /** Elimina un documento por id (mock; en M2 será un DELETE a la API). */
  remove(id: string): void {
    this._documents.update((docs) => docs.filter((d) => d.id !== id));
  }
}

/** Id estable para documentos creados en sesión (mock; en M2 lo asigna la BD). */
function cryptoId(): string {
  return crypto.randomUUID();
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'd1',
    name: 'Manual de la API de Pagos',
    folderId: 'api-v1',
    type: 'pdf',
    status: 'published',
    author: 'María Soto',
    uploadedAt: '2026-05-12T10:00:00Z',
    updatedAt: '2026-06-10T08:30:00Z',
    size: 1_842_000,
    tags: ['api', 'pagos', 'rest'],
    source: { kind: 'file' },
  },
  {
    id: 'd2',
    name: 'Guía de Onboarding Frontend',
    folderId: 'guias',
    type: 'md',
    status: 'published',
    author: 'José Velosa',
    uploadedAt: '2026-04-02T14:20:00Z',
    updatedAt: '2026-06-14T09:15:00Z',
    size: 48_500,
    tags: ['angular', 'onboarding'],
    source: { kind: 'file' },
  },
  {
    id: 'd3',
    name: 'Plantilla de Acta de Reunión',
    folderId: 'plantillas',
    type: 'docx',
    status: 'draft',
    author: 'Ana Ruiz',
    uploadedAt: '2026-06-01T16:45:00Z',
    updatedAt: '2026-06-01T16:45:00Z',
    size: 96_300,
    tags: ['plantilla', 'reuniones'],
    source: { kind: 'file' },
  },
  {
    id: 'd4',
    name: 'Presupuesto Q3 2026',
    folderId: 'finanzas',
    type: 'xlsx',
    status: 'review',
    author: 'Carlos Méndez',
    uploadedAt: '2026-06-08T11:10:00Z',
    updatedAt: '2026-06-13T17:00:00Z',
    size: 312_700,
    tags: ['finanzas', 'q3'],
    source: { kind: 'file' },
  },
  {
    id: 'd5',
    name: 'Arquitectura de Microservicios',
    folderId: 'arquitectura',
    type: 'pdf',
    status: 'review',
    author: 'José Velosa',
    uploadedAt: '2026-05-28T09:00:00Z',
    updatedAt: '2026-06-12T13:40:00Z',
    size: 2_410_000,
    tags: ['arquitectura', 'microservicios'],
    source: { kind: 'file' },
  },
  {
    id: 'd6',
    name: 'Diagrama de Flujo - Checkout',
    folderId: 'diseno',
    type: 'img',
    status: 'published',
    author: 'Lucía Fernández',
    uploadedAt: '2026-03-19T12:30:00Z',
    updatedAt: '2026-05-20T10:05:00Z',
    size: 845_000,
    tags: ['diseño', 'checkout'],
    source: { kind: 'file' },
  },
  {
    id: 'd7',
    name: 'Política de Seguridad de la Información',
    folderId: 'seguridad',
    type: 'pdf',
    status: 'archived',
    author: 'Ana Ruiz',
    uploadedAt: '2025-11-04T08:00:00Z',
    updatedAt: '2026-01-15T15:20:00Z',
    size: 1_120_000,
    tags: ['seguridad', 'políticas'],
    source: { kind: 'file' },
  },
  {
    id: 'd8',
    name: 'Especificación de Requisitos M2',
    folderId: 'producto',
    type: 'docx',
    status: 'draft',
    author: 'Carlos Méndez',
    uploadedAt: '2026-06-11T10:50:00Z',
    updatedAt: '2026-06-15T07:25:00Z',
    size: 178_900,
    tags: ['requisitos', 'backend'],
    source: { kind: 'file' },
  },
  {
    id: 'd9',
    name: 'Notas de la Release 1.4',
    folderId: 'releases',
    type: 'md',
    status: 'published',
    author: 'José Velosa',
    uploadedAt: '2026-06-05T18:00:00Z',
    updatedAt: '2026-06-09T11:30:00Z',
    size: 22_100,
    tags: ['release', 'changelog'],
    source: { kind: 'file' },
  },
  {
    id: 'd10',
    name: 'Inventario de Activos TI',
    folderId: 'infraestructura',
    type: 'xlsx',
    status: 'archived',
    author: 'Lucía Fernández',
    uploadedAt: '2025-12-20T09:40:00Z',
    updatedAt: '2026-02-28T14:10:00Z',
    size: 540_000,
    tags: ['inventario', 'ti'],
    source: { kind: 'file' },
  },
  {
    id: 'd11',
    name: 'Roadmap del Producto 2026',
    folderId: 'producto',
    type: 'pdf',
    status: 'review',
    author: 'María Soto',
    uploadedAt: '2026-06-13T08:15:00Z',
    updatedAt: '2026-06-14T16:55:00Z',
    size: 1_650_000,
    tags: ['roadmap', 'producto'],
    source: { kind: 'file' },
  },
  {
    id: 'd12',
    name: 'Guía de Estilo de Marca',
    folderId: 'diseno',
    type: 'img',
    status: 'published',
    author: 'Lucía Fernández',
    uploadedAt: '2026-02-10T13:00:00Z',
    updatedAt: '2026-04-22T09:50:00Z',
    size: 3_200_000,
    tags: ['marca', 'diseño'],
    source: { kind: 'file' },
  },
];
