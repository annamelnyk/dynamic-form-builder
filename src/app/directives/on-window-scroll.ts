import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOnWindowScroll]',
})
export class OnWindowScroll {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.renderer.addClass(this.element.nativeElement, 'shadow');
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'shadow');
    }
  }
}
