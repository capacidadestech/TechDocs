import { Component, input, output } from '@angular/core';

/**
 * Shell de modal reutilizable: fondo difuminado + tarjeta centrada con animación
 * de entrada y cierre por Esc / clic en el fondo / botón ✕. El contenido se
 * proyecta con `<ng-content>`; el consumidor pone campos y acciones (usa el
 * primitivo global `.modal-actions` para el footer).
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  host: {
    '(document:keydown.escape)': 'close.emit()',
  },
})
export class Modal {
  readonly heading = input('');
  readonly close = output<void>();
}
