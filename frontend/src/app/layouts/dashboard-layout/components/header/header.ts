import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderService } from '../../../../shared/services/page-header.service';
import { DocumentFilterService } from '../../../../features/documents/services/document-filter.service';
import { DocumentFilters } from '../../../../features/documents/components/document-filters/document-filters';

/**
 * Header (dumb) del DashboardLayout. Dos modos según la ruta (`data.folderNav`):
 * - **Documentos (carpetas):** solo el buscador + popover de filtros; el encabezado
 *   (breadcrumb + título) lo lleva `<app-breadcrumb>` dentro del panel.
 * - **Estático:** breadcrumb + título desde el `data` de la ruta (p. ej. Configuración).
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, DocumentFilters],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly pageHeader = inject(PageHeaderService);
  protected readonly filters = inject(DocumentFilterService);
}
