import {Component, Input} from "@angular/core";
import {UIPagerService} from "../appService/_base";

/**
 * Created by adin1 on 2017/3/25.
 */
@Component({
  selector: '[uiPager]',
  template: `
    <ul class="pull-right pagination">
  <li class="pagination-first ng-scope" [class.disabled]="pager.isFirst"><a (click)="pager.toFirst()" class="ng-binding">首 页</a></li>
    <li class="pagination-next ng-scope"  [class.disabled]="pager.isFirst"><a  (click)="pager.toPrev()" >上一页</a></li>
  <li *ngFor="let p of pager.pages" [class.active]="p==pager.pageIndex"><a (click)="pager.selectPage(p)" >{{p}}</a></li>  
  <li class="pagination-next ng-scope"  [class.disabled]="pager.isLast"><a (click)="pager.toNext()" >下一页</a></li>
  <li class="pagination-last ng-scope"  [class.disabled]="pager.isLast"><a (click)="pager.toLast()" >最后一页</a></li>
</ul>
  `,
  styles: [`
   
  `]
})
export class UIPagerComponent {
  constructor() {
  }

  @Input()
  pager: UIPagerService;



}
