import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-mode-switcher',
  imports: [MatButtonToggleModule, RouterLink, ReactiveFormsModule],
  templateUrl: './form-mode-switcher.html',
  styleUrl: './form-mode-switcher.scss',
})
export class FormModeSwitcher {
  router = inject(Router);

  currentRoute = new FormControl('');

  ngOnInit(): void {
    this.currentRoute.setValue(this.router.url);
  }
}
