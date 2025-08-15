import { Component, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'

import { NgTemplateOutlet } from '@angular/common'
import { MatToolbar } from '@angular/material/toolbar'
import { Router, RouterLink } from '@angular/router'
import { OnWindowScroll } from '@directives/on-window-scroll'
import { AppTheme, Theme } from '@services/theme'

@Component({
  selector: 'app-header',
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatToolbar,
    ReactiveFormsModule,
    OnWindowScroll,
    RouterLink,
    NgTemplateOutlet,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themeService = inject(Theme)
  router = inject(Router)

  theme = new FormControl<AppTheme>(this.themeService.selectedTheme())

  setSelectedTheme(theme: FormControl) {
    this.themeService.setTheme(theme.value)
  }
}
