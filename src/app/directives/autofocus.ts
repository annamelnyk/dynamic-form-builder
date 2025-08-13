import { AfterContentInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appAutofocus]',
})
export class Autofocus implements AfterContentInit {
  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    this.el.nativeElement.focus()
  }
}
