import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { Theme, ThemeMode, ThemeType } from '../../services/theme';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatButtonToggleModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themeService = inject(Theme);

  theme = new FormControl<ThemeType>(ThemeMode.Light);
}
