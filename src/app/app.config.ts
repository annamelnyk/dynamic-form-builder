import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'

import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router'

import { routes } from './app.routes'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
        floatLabel: 'always',
      },
    },
  ],
}
