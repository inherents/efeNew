import {NgModule, Injectable, ViewContainerRef, TemplateRef}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { SharkModule } from '@ntesmail/shark-angular2/index';
import {
  RouterModule,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router }  from '@angular/router';
import { AppComponent }  from './app.component';
import {
  AppMainComponent,
  AppWelcomeComponent,
  AppProductListComponent,
  AppCompanyComponent,
  financeReportComponent,
  capitalFlowComponent,
  taxInvoiceComponent,
  quickApplyComponent,   //立即申请
  perfectReportComponent,  //完善报告
  letterCreditComponent,   //提交征信授权书
  balanceComponent,   //资产负债表
  incomeComponent,   //净利润表
  cashFlowComponent,   //现金流量表
  UIListComponent,
  UIListCellComponent,
  HtmlTemplatePipe,
  HtmlOutletDirective,
  loginDirective,
  UIUploaderComponent,
  UIPagerComponent
}  from './_base';
import { Observable } from 'rxjs/Observable';
import{AppLoginService,AppPermService,UIPagerService,UIUploaderService} from './appService/_base';
import {HttpModule} from '@angular/http';
import{AppHttpUtil,AppSessionUtil} from './appUtil/_base';
import{AppUrlConfig} from './appConfig/_base'
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


@Injectable()
class CanActivateTeam implements CanActivate {
  constructor(private session:AppSessionUtil) {}
  canActivate(
    state: ActivatedRouteSnapshot
  ):boolean {
    // return this.permissions.canActivate(this.currentUser, route.params.id);
    console.log(state.params);
    let si=this.session.userInfo(true);
    return true;
  }
}


//路由配置

let routes=RouterModule.forChild([
  {
    path: '',
    component: AppMainComponent,
  }
]);

let routes2=RouterModule.forChild([
  {
    path: 'home',
    component: AppWelcomeComponent,
    children:[
      {
        path: '',
        component: AppProductListComponent
      },{
        path:'company',
        component: AppCompanyComponent
      },{
        path: 'financialReport',
        component: financeReportComponent
      },{
        path: 'capitalFlow',
        component: capitalFlowComponent
      },{
        path: 'taxInvoice',
        component: taxInvoiceComponent
      },{
        path: 'quickApply',
        component: quickApplyComponent
      },{
        path: 'perfectReport',
        component: perfectReportComponent
      },{
        path: 'letterCredit',
        component: letterCreditComponent
      },{
        path: 'balance',
        component: balanceComponent
      },{
        path: 'income',
        component: incomeComponent
      },{
        path: 'cashFlow',
        component: cashFlowComponent
      }
    ]
  }
]);

let rootRouter=RouterModule.forRoot([
/*  {
    path: 'test',
    component: financeReportComponent
  }*/
]);

@NgModule({
  imports:      [ BrowserModule,FormsModule,SharkModule,routes,routes2,rootRouter,HttpModule,Ng2Bs3ModalModule],

  declarations: [
    AppComponent,
    AppMainComponent,
    AppWelcomeComponent,
    AppProductListComponent,
    AppCompanyComponent,
    financeReportComponent,
    capitalFlowComponent,
    taxInvoiceComponent,
    quickApplyComponent,
    perfectReportComponent,
    letterCreditComponent,
    balanceComponent,
    incomeComponent,
    cashFlowComponent,
    UIListComponent,
    UIListCellComponent,
    HtmlTemplatePipe,
    HtmlOutletDirective,
    loginDirective,
    UIUploaderComponent,
    UIPagerComponent
  ],

  providers: [
    CanActivateTeam,
    AppHttpUtil,
    AppLoginService,
     AppPermService,
     AppSessionUtil,
     UIUploaderService,
     UIPagerService,
     AppUrlConfig,
     TemplateRef, ViewContainerRef
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
