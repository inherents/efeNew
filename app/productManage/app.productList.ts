import {Component, EventEmitter,Output,ViewChild,Input} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {UIUploaderService} from "../appService/_base";
import {UIPagerService} from "../appService/uiPagerService";
import {AppWelcomeComponent} from "../welcome/app.welcome";


let templateUrl='app/productManage/app.productList.html';

@Component({
  templateUrl:templateUrl,
  styles: [`

  `]
})

export class AppProductListComponent {
  public quickUpShow:boolean;
  public quickUpHide:boolean;
  public returnBtn:boolean;
  filterText:string='';
  tests:any;
  productList:any={
    dataSource:[],
    thead:['产品名称','发布时间','贷款利率','所属系列','额度范围（万元）','贷款期限','状态','操作','签署合同'],
    tbody:[
      {field:'productName'},
      {field:'productName'},
      {field:'productName'},
      {field:'productName'},
      {field:'productName'},
      {field:'productName'},
      {field:'productName'},
      {field:'productName'},
      {field:'productName',template:`<a class="btn btn-link" (click)="entity.listContext.evtWriteContract();">签订合同</a>`}
    ]
  };


  @Output() onModal = new EventEmitter<string>();
  @ViewChild('myModal')
  modal: ModalComponent;

  uploader:UIUploaderService;
  listPager:UIPagerService;

  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router,_listPager:UIPagerService,_welcome: AppWelcomeComponent){
    let that=this;
    this.quickUpShow = true;
    this.quickUpHide = false;
    this.returnBtn = false;
    this.tests = _welcome;
    var json={"code":0,"data":[{"loanAmount":"30.00-500.00","loanDate":"6月","loanRate":"13.00-20.00","productId":110,"productName":"徕乾保理-赢通","productType":"000003","publishTime":"2016-12-23","status":"1"},{"loanAmount":"10.00-300.00","loanDate":"1年","loanRate":"18.00","productId":123,"productName":"众安-ETC后付费","productType":"000000","publishTime":"2016-12-07","status":"1"},{"loanAmount":"10.00-300.00","loanDate":"1-13月","loanRate":"5.00-10.00","productId":119,"productName":"建设银行-建赢通","productType":"000003","publishTime":"2016-12-06","status":"1"},{"loanAmount":"4.00-100.00","loanDate":"1-12月","loanRate":"8.00-9.00","productId":112,"productName":"“恒联通”司机贷","productType":"000006","publishTime":"2016-12-05","status":"1"},{"loanAmount":"1.00-200.00","loanDate":"10月","loanRate":"8.00-10.00","productId":120,"productName":"绿行通SHSB-J-AR","productType":"000000","publishTime":"2016-12-05","status":"1"},{"loanAmount":"1.00-10.00","loanDate":"12月","loanRate":"14.00","productId":99,"productName":"“恒福通”司机贷","productType":"000006","publishTime":"2016-12-05","status":"1"},{"loanAmount":"50.00-200.00","loanDate":"1-12月","loanRate":"5.00-8.00","productId":121,"productName":"上海农商行-商和通","productType":"000001","publishTime":"2016-12-01","status":"1"},{"loanAmount":"100.00-500.00","loanDate":"1年","loanRate":"13.00","productId":122,"productName":"交通银行-交和通","productType":"000001","publishTime":"2016-12-01","status":"1"},{"loanAmount":"1.00-2.00","loanDate":"4-5月","loanRate":"19.00-20.00","productId":102,"productName":"招福通","productType":"000006","publishTime":"2016-10-17","status":"1"},{"loanAmount":"1.00-2.00","loanDate":"4-5月","loanRate":"19.00-20.00","productId":101,"productName":"点福通","productType":"000006","publishTime":"2016-10-17","status":"1"}],"extra":{"pageData":{"pageCount":1,"pageSize":10,"totalCount":10}},"flag":true,"message":"成功"};
    that.productList.dataSource=json.data;

    /*var json={"code":0,"data":[{"loanAmount":"30.00-500.00","loanDate":"6月","loanRate":"13.00-20.00","productId":110,"productName":"徕乾保理-赢通","productType":"000003","publishTime":"2016-12-23","status":"1"},{"loanAmount":"10.00-300.00","loanDate":"1年","loanRate":"18.00","productId":123,"productName":"众安-ETC后付费","productType":"000000","publishTime":"2016-12-07","status":"1"},{"loanAmount":"10.00-300.00","loanDate":"1-13月","loanRate":"5.00-10.00","productId":119,"productName":"建设银行-建赢通","productType":"000003","publishTime":"2016-12-06","status":"1"},{"loanAmount":"4.00-100.00","loanDate":"1-12月","loanRate":"8.00-9.00","productId":112,"productName":"“恒联通”司机贷","productType":"000006","publishTime":"2016-12-05","status":"1"},{"loanAmount":"1.00-200.00","loanDate":"10月","loanRate":"8.00-10.00","productId":120,"productName":"绿行通SHSB-J-AR","productType":"000000","publishTime":"2016-12-05","status":"1"},{"loanAmount":"1.00-10.00","loanDate":"12月","loanRate":"14.00","productId":99,"productName":"“恒福通”司机贷","productType":"000006","publishTime":"2016-12-05","status":"1"},{"loanAmount":"50.00-200.00","loanDate":"1-12月","loanRate":"5.00-8.00","productId":121,"productName":"上海农商行-商和通","productType":"000001","publishTime":"2016-12-01","status":"1"},{"loanAmount":"100.00-500.00","loanDate":"1年","loanRate":"13.00","productId":122,"productName":"交通银行-交和通","productType":"000001","publishTime":"2016-12-01","status":"1"},{"loanAmount":"1.00-2.00","loanDate":"4-5月","loanRate":"19.00-20.00","productId":102,"productName":"招福通","productType":"000006","publishTime":"2016-10-17","status":"1"},{"loanAmount":"1.00-2.00","loanDate":"4-5月","loanRate":"19.00-20.00","productId":101,"productName":"点福通","productType":"000006","publishTime":"2016-10-17","status":"1"}],"extra":{"pageData":{"pageCount":1,"pageSize":10,"totalCount":10}},"flag":true,"message":"成功"};
    that.productList.dataSource=json.data;*/
    _uploader.headers={
      'TOKEN':sessionUtil.userInfo(true).token
    };
    _uploader.action='http://192.168.1.142:11005/product/uploadIcon';
    this.uploader=_uploader;
    this.listPager=_listPager;
  }

  quickApply(){
    this.router.navigate(['./home/quickApply']);
    this.tests.returnBtn = true;
  }

  //马上升级
  quickUp(){
    this.quickUpShow = false;
    this.quickUpHide = true;
  }

  //财务报告
  submitOne(){
    this.router.navigate(['./home/financialReport']);
    this.tests.returnBtn = true;
  }

  //资金流水
  submitTwo(){
    this.router.navigate(['./home/capitalFlow']);
    this.tests.returnBtn = true;
  }

  //税控盘发票
  submitThree(){
    this.router.navigate(['./home/taxInvoice']);
    this.tests.returnBtn = true;
  }

  //提交征信授权书
  letterCredit(){
    this.router.navigate(['./home/letterCredit']);
    this.tests.returnBtn = true;
  }

  ngOnInit(){
    this.listPager.init({
      totalCount:12
    });
  }

  evtWriteContract(){
    console.log('contract');
    this.onModal.emit('007');
    this.modal.open();
  }
  evtUploadContract(){

  }

}
