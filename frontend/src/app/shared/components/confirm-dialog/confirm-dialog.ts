import { Component, input, output } from '@angular/core';
import { Modal } from '../modal/modal';

/**
 * Diálogo de confirmación reutilizable (sobre la {@link Modal} compartida).
 * Emite `confirm` al aceptar y `cancel`/`close` al cancelar.
 */
@Component({
  selector: 'app-confirm-dialog',
  imports: [Modal],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  readonly heading = input('Confirmar');
  readonly message = input('');
  readonly confirmLabel = input('Confirmar');
  /** Marca la acción como destructiva (botón en color de peligro). */
  readonly destructive = input(false);

  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
