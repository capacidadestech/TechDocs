import { Component, input } from '@angular/core';

/** Estado vacío reutilizable: recuadro punteado con título + mensaje. */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  readonly heading = input.required<string>();
  readonly message = input<string>('');
}
