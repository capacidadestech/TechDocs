import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { UserMenu } from './components/user-menu/user-menu';

/** Shell interno: sidebar + header + área de contenido (`<router-outlet>`). */
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Sidebar, Header, UserMenu],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  /** Estado del sidebar en móvil (off-canvas). */
  protected readonly sidebarOpen = signal(false);

  /** Sidebar colapsado en escritorio (para ganar espacio). */
  protected readonly sidebarCollapsed = signal(false);

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  protected toggleCollapsed(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }
}
