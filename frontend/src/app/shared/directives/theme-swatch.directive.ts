import { Directive, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';

/**
 * Directiva de atributo `[appThemeSwatch]` (tema débil M1 — Directivas Básicas).
 * Se aplica a cada opción del selector de temas:
 *   - `input()` con el id del tema,
 *   - manejo del evento `click` en el objeto `host` (forma v22, no `@HostListener`),
 *   - `host` class binding (`is-active`) para marcar el tema activo.
 */
@Directive({
  selector: '[appThemeSwatch]',
  host: {
    '(mouseenter)': 'preview()',
    '(click)': 'select()',
    '[class.is-active]': 'isActive()',
    '[attr.aria-pressed]': 'isActive()',
  },
})
export class ThemeSwatch {
  private readonly theme = inject(ThemeService);

  /** Id del tema que aplica esta opción. */
  readonly appThemeSwatch = input.required<string>();

  protected isActive(): boolean {
    return this.theme.currentId() === this.appThemeSwatch();
  }

  /** Hover → vista previa en vivo (estilo VS Code). */
  protected preview(): void {
    this.theme.preview(this.appThemeSwatch());
  }

  /** Clic → confirma y persiste. */
  protected select(): void {
    this.theme.setTheme(this.appThemeSwatch());
  }
}
