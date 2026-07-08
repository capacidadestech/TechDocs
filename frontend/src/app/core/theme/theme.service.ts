import { Injectable, signal } from '@angular/core';

export interface Theme {
  id: string;
  name: string;
  tokens: Record<string, string>; // valores de las variables --color-*
}

/**
 * Gestiona el tema visual: define las paletas completas, las aplica a `:root`
 * (sobrescribiendo las variables CSS) y persiste la elección en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'techdocs-theme';

  readonly themes: Theme[] = [
    {
      id: 'kernel',
      name: 'Kernel',
      tokens: {
        '--color-background': '#002532',
        '--color-foreground': '#e3e2da',
        '--color-surface': '#0a3b4a',
        '--color-surface-elevated': '#14505e',
        '--color-primary': '#b5b5aa',
        '--color-primary-foreground': '#002532',
        '--color-muted': '#2a4f5e',
        '--color-muted-foreground': '#a5a59a',
        '--color-accent': '#1f4f5e',
        '--color-accent-foreground': '#e3e2da',
        '--color-border': '#2a5a6a',
        '--color-destructive': '#c45c5c',
      },
    },
    {
      id: 'cobalt',
      name: 'Cobalt',
      tokens: {
        '--color-background': '#0b1226',
        '--color-foreground': '#e7e9f5',
        '--color-surface': '#141d3a',
        '--color-surface-elevated': '#1e294f',
        '--color-primary': '#8aa0ff',
        '--color-primary-foreground': '#0b1226',
        '--color-muted': '#232f55',
        '--color-muted-foreground': '#9aa3c8',
        '--color-accent': '#243161',
        '--color-accent-foreground': '#e7e9f5',
        '--color-border': '#2b3866',
        '--color-destructive': '#e06c75',
      },
    },
    {
      id: 'matrix',
      name: 'Matrix',
      tokens: {
        '--color-background': '#05140d',
        '--color-foreground': '#def0e2',
        '--color-surface': '#0d2419',
        '--color-surface-elevated': '#143524',
        '--color-primary': '#6ee7a0',
        '--color-primary-foreground': '#05140d',
        '--color-muted': '#1b3a2a',
        '--color-muted-foreground': '#9bbfa6',
        '--color-accent': '#163d29',
        '--color-accent-foreground': '#def0e2',
        '--color-border': '#1d4a32',
        '--color-destructive': '#d9785f',
      },
    },
    {
      id: 'synthwave',
      name: 'Synthwave',
      tokens: {
        '--color-background': '#160a26',
        '--color-foreground': '#f0e7fb',
        '--color-surface': '#241338',
        '--color-surface-elevated': '#321b4f',
        '--color-primary': '#c98cff',
        '--color-primary-foreground': '#160a26',
        '--color-muted': '#382252',
        '--color-muted-foreground': '#b6a3cf',
        '--color-accent': '#3a2160',
        '--color-accent-foreground': '#f0e7fb',
        '--color-border': '#422a66',
        '--color-destructive': '#ff6b9d',
      },
    },
    {
      id: 'graphite',
      name: 'Graphite',
      tokens: {
        '--color-background': '#0e1116',
        '--color-foreground': '#e6e8ed',
        '--color-surface': '#181c23',
        '--color-surface-elevated': '#232830',
        '--color-primary': '#aab2c0',
        '--color-primary-foreground': '#0e1116',
        '--color-muted': '#262c36',
        '--color-muted-foreground': '#98a0ad',
        '--color-accent': '#2b323d',
        '--color-accent-foreground': '#e6e8ed',
        '--color-border': '#2f3742',
        '--color-destructive': '#e06c75',
      },
    },
    {
      id: 'daylight',
      name: 'Daylight',
      tokens: {
        '--color-background': '#f6f7f9',
        '--color-foreground': '#1a1f26',
        '--color-surface': '#ffffff',
        '--color-surface-elevated': '#eef1f5',
        '--color-primary': '#2f6f63',
        '--color-primary-foreground': '#ffffff',
        '--color-muted': '#e7ebf0',
        '--color-muted-foreground': '#5b6470',
        '--color-accent': '#dceae6',
        '--color-accent-foreground': '#1a1f26',
        '--color-border': '#dfe4ea',
        '--color-destructive': '#c0392b',
      },
    },
  ];

  readonly currentId = signal<string>(this.loadSaved());

  constructor() {
    this.apply(this.currentId());
  }

  setTheme(id: string): void {
    this.currentId.set(id);
    try {
      localStorage.setItem(this.storageKey, id);
    } catch {
      /* almacenamiento no disponible */
    }
    this.apply(id);
  }

  /** Aplica un tema temporalmente (vista previa), sin cambiar el actual ni persistir. */
  preview(id: string): void {
    this.apply(id);
  }

  /** Revierte la vista previa al tema confirmado. */
  cancelPreview(): void {
    this.apply(this.currentId());
  }

  private apply(id: string): void {
    const theme = this.themes.find((t) => t.id === id) ?? this.themes[0];
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.tokens)) {
      root.style.setProperty(key, value);
    }
  }

  private loadSaved(): string {
    try {
      return localStorage.getItem(this.storageKey) ?? 'kernel';
    } catch {
      return 'kernel';
    }
  }
}
