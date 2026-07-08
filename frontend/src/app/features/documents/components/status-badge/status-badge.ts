import { Component, computed, input } from '@angular/core';
import { DocumentStatus, STATUS_LABELS } from '../../models/document.model';

/** Píldora de color que representa el estatus de un documento. */
@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  readonly status = input.required<DocumentStatus>();

  protected readonly label = computed(() => STATUS_LABELS[this.status()]);
}
