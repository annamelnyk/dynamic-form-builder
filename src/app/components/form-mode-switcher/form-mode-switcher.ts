import { Component, computed, inject, signal } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { RouterLink } from '@angular/router'
import { Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Component({
  selector: 'app-form-mode-switcher',
  imports: [MatButtonToggleModule, RouterLink, TitleCasePipe],
  templateUrl: './form-mode-switcher.html',
  styleUrl: './form-mode-switcher.scss',
})
export class FormModeSwitcher {
  buildModeService = inject(BuildMode)
  formBuilderService = inject(FormBuilderService)
  Mode = Mode
}
