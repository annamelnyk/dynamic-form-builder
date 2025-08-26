import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'semicolon',
})
export class SemicolonPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return `${value}:`
  }
}
