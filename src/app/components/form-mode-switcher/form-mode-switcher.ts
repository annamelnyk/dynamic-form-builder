import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router, RouterLink } from '@angular/router';
import { Mode } from '@model/form-fields';

@Component({
  selector: 'app-form-mode-switcher',
  imports: [MatButtonToggleModule, RouterLink, ReactiveFormsModule],
  templateUrl: './form-mode-switcher.html',
  styleUrl: './form-mode-switcher.scss',
})
export class FormModeSwitcher {
  router = inject(Router);

  FormMode = Mode;
  currentRoute = new FormControl('');

  ngOnInit(): void {
    this.currentRoute.setValue(this.router.url);
  }
}
