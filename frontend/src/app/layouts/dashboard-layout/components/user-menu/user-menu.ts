import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Menú de usuario (dumb): botón-avatar (solo icono) + dropdown con "Cerrar sesión".
 * Reutilizable en el footer del sidebar y el topbar (móvil). `placement` decide
 * si el dropdown abre hacia abajo (default) o hacia arriba (footer del sidebar).
 * El logout real (limpiar JWT) se conecta en M3.
 */
@Component({
  selector: 'app-user-menu',
  imports: [RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  /** Dirección del dropdown: `'down'` (default) o `'up'` (cuando está abajo del todo). */
  readonly placement = input<'down' | 'up'>('down');

  /** Muestra el nombre junto al avatar (fila de cuenta del sidebar). */
  readonly showName = input(false);

  // Placeholder: el nombre real vendrá del usuario autenticado en M3.
  protected readonly name = 'Usuario';
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }
}
