import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { AppTheme, Theme } from '@services/theme';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { OnWindowScroll } from '@directives/on-window-scroll';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatToolbar,
    ReactiveFormsModule,
    OnWindowScroll,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themeService = inject(Theme);

  theme = new FormControl<AppTheme>(this.themeService.selectedTheme());

  setSelectedTheme(theme: FormControl) {
    this.themeService.setTheme(theme.value);
  }
}
