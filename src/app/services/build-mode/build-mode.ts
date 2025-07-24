import { inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router } from '@angular/router'
import { filter, map, startWith, tap } from 'rxjs/operators'

import { Mode } from '@model/form-fields'

@Injectable({
  providedIn: 'root',
})
export class BuildMode {
  router = inject(Router)

  urlPath$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => this.getModeFromUrlPath(event.urlAfterRedirects)),
    startWith(this.getModeFromUrlPath(this.router.url)),
    tap(url => console.log('URL Path:', url)),
  )
  mode = toSignal<Mode | string>(this.urlPath$)

  getModeFromUrlPath(path: string): string {
    if (!path) return ''
    return path.substring(1)
  }
}
