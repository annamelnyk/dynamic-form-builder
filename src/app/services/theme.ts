import { computed, effect, Injectable, signal } from '@angular/core';

export interface AppTheme {
  name: string;
  icon: string;
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type ThemeType = ThemeMode.Light | ThemeMode.Dark | ThemeMode.System;

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private appTheme = signal<ThemeType>(ThemeMode.System);

  private themes: AppTheme[] = [
    { name: ThemeMode.Light, icon: 'light_mode' },
    { name: ThemeMode.Dark, icon: 'dark_mode' },
    { name: ThemeMode.System, icon: 'desktop_windows' },
  ];

  selectedTheme = computed(() =>
    this.themes.find((t) => t.name === this.appTheme())
  );

  getThemes() {
    return this.themes;
  }

  setTheme(theme: ThemeType) {
    this.appTheme.set(theme);
  }

  constructor() {
    effect(() => {
      const appTheme = this.appTheme();
      const colorScheme =
        appTheme === ThemeMode.System ? 'light dark' : appTheme;
      document.body.style.setProperty('color-scheme', colorScheme);
    });
  }
}
