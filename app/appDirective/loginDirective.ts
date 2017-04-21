import { Directive, ElementRef, Renderer } from '@angular/core';

/**
 * Created by adin1 on 2017/3/25.
 */
@Directive({
  selector: '[login]'
})

export class loginDirective {
  custStyle:any;
  constructor() {
    //样式
    this.custStyle={
      'margin-top': "15%",
      'overflow': 'hidden'
    };
  }
}
