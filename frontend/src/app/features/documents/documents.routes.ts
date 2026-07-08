import { Routes } from '@angular/router';
import { DocumentList } from './pages/document-list/document-list';

export const DOCUMENTS_ROUTES: Routes = [
  {
    path: '',
    component: DocumentList,
    // El breadcrumb y el título salen de la carpeta activa (FolderService), no de la ruta.
    data: { folderNav: true },
  },
];
