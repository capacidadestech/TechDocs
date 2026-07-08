import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface Crumb {
  label: string;
  link?: string;
}

/**
 * Deriva el **breadcrumb** y el **título** del header desde los `data` de la ruta
 * activa más profunda. Cada página define `data: { title, crumbs }` en sus rutas.
 */
@Injectable({ providedIn: 'root' })
export class PageHeaderService {
  private readonly router = inject(Router);

  readonly title = signal('');
  readonly crumbs = signal<Crumb[]>([]);
  /** `true` cuando la ruta usa el breadcrumb dinámico de carpetas. */
  readonly folderNav = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.update());
    this.update();
  }

  private update(): void {
    let snapshot: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    let data: Record<string, unknown> = {};
    while (snapshot) {
      data = { ...data, ...snapshot.data };
      snapshot = snapshot.firstChild;
    }
    this.title.set((data['title'] as string) ?? '');
    this.crumbs.set((data['crumbs'] as Crumb[]) ?? []);
    this.folderNav.set((data['folderNav'] as boolean) ?? false);
  }
}
