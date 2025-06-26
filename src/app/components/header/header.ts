import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { AppTheme, Theme } from '../../services/theme';

@Component({
  selector: 'app-header',
  imports: [MatButtonToggleModule, MatIconModule, ReactiveFormsModule],
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
