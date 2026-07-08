import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../core/theme/theme.service';
import { ThemeSwatch } from '../../../../shared/directives/theme-swatch.directive';
import { FolderService } from '../../../../features/documents/services/folder.service';

/**
 * Pantalla de configuración (ruta `/dashboard/settings`). Por ahora trae la
 * sección "Apariencia" (temas, con vista previa en vivo). Extensible a futuro.
 */
@Component({
  selector: 'app-settings-page',
  imports: [ThemeSwatch],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  protected readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly folders = inject(FolderService);

  /** Tras elegir un tema, cierra Configuración y vuelve al Inicio. */
  protected goHome(): void {
    this.folders.select(null);
    this.router.navigate(['/dashboard']);
  }
}
