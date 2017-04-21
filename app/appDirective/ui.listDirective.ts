/**
 * Created by adin1 on 2017/2/24.
 */
import {Component, Input, Directive, ElementRef, TemplateRef, ViewContainerRef, Compiler} from '@angular/core';


@Component({
  selector:'uiList',
  template:`
    <ul class="ui_list ui_list_">
    <li class="ui_list_head" >
           <div class="ui_th ui_td" *ngFor="let th of list.thead">{{th}}</div>        
    </li>
    <li class="ui_list_row" *ngFor="let item of list.dataSource">           
            <div  *ngFor="let td of list.tbody"   class="ui_td">
                 <div *ngIf="td.template" uiHtml [html]="td.template" [entity]="this"></div>
                 <span *ngIf="!td.template">{{item[td.field]}}</span>
            </div>
    </li>
    <li  class="ui_list_row" *ngIf="list.length==0">
        <i class="fa fa-info-circle" aria-hidden="true"></i>没有相关数据
    </li>
</ul>
  `,
  styles: [`
   
  `]
})
export class UIListComponent {
  constructor() {
  }
  @Input()
  list:any;
  @Input()
  listContext:any;
}


@Directive({
  selector: '[uiListCell]'
})
export class UIListCellComponent  {


  constructor(  private templateRef: TemplateRef<any>,private compiler: Compiler,
                private viewContainer: ViewContainerRef) {

  }
  @Input()
  cell:any;
  @Input()
  cellData:any;
  cellType:number;

  ngOnInit(){
    //console.log(this.cellData,this.cell);
    // var that=this;
    // if(that.cell.template==null || that.cell.template==''){
    //   that.cellType=1;
    // }else{
    //   that.cellType=2;
    // }
    //this.templateRef=new TemplateRef<string>();
    //this.viewContainer.createEmbeddedView(this.templateRef);
    console.log(this.templateRef);
  }

  @Input() set uiListCell(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}

@Component({ selector: 'uiListCellData' })
export class UIListCellDataComponent{
  constructor(el: ElementRef) {

  }
  @Input()
  cellData:any;
}
