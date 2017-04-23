import { Directive, ElementRef, Renderer } from '@angular/core';

/**
 * Created by adin1 on 2017/3/25.
 */
@Directive({
  selector: '[login]'
})

export class loginDirective {
  custStyle:any;
  constructor(elem: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(elem.nativeElement, 'margin-top', '15%');
  }
}
