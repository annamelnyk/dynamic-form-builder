import {
  computed,
  DOCUMENT,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'light dark',
}

export type ThemeType = ThemeMode.Light | ThemeMode.Dark | ThemeMode.System;
export interface AppTheme {
  name: ThemeType;
  icon: string;
}
@Injectable({
  providedIn: 'root',
})
export class Theme {
  private themes: AppTheme[] = [
    { name: ThemeMode.System, icon: 'desktop_windows' },
    { name: ThemeMode.Light, icon: 'light_mode' },
    { name: ThemeMode.Dark, icon: 'dark_mode' },
  ];

  private readonly document = inject(DOCUMENT);
  private appTheme = signal<AppTheme>(this.themes[0]);

  selectedTheme = computed<AppTheme>(
    () => this.themes.find((t) => t.name === this.appTheme().name) as AppTheme
  );

  getThemes() {
    return this.themes;
  }

  setTheme(theme: AppTheme) {
    this.appTheme.set(theme);
  }

  constructor() {
    effect(() => {
      this.document.body.style.setProperty(
        'color-scheme',
        this.appTheme().name
      );
    });
  }
}
