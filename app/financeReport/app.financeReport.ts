import {Component, EventEmitter,Output,ViewChild} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {UIUploaderService} from "../appService/_base";


let templateUrl='app/financeReport/app.financeReport.html';


@Component({
  templateUrl:templateUrl,
  styleUrls: []
})
export class financeReportComponent {
  balanceBtn:any;
  incomeBtn:any;
  cashFlowBtn:any;
  filterText:string='';
  loserRadio = [];

  @Output() onModal = new EventEmitter<string>();
  @ViewChild('myModal')
  modal: ModalComponent;

  uploader:UIUploaderService;

  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router){
    let that=this;
    this.balanceBtn = "btn-primary";
    this.incomeBtn = "activeBgs";
    this.cashFlowBtn = "activeBgs";

    var data = [
      {time:'2017-01-01',status:0},
      {time:'2017-01-02',status:0},
      {time:'2017-01-03',status:0},
      {time:'2017-01-04',status:0},
      {time:'2017-01-05',status:0},
      {time:'2017-01-06',status:0},
      {time:'2017-01-07',status:0},
      {time:'2017-01-08',status:0},
      {time:'2017-01-09',status:0},
      {time:'2017-01-10',status:0},
      {time:'2017-01-11',status:0},
      {time:'2017-01-12',status:0}
    ];
    this.loserRadio = data;

    _uploader.headers={
      'TOKEN':sessionUtil.userInfo(true).token
    };
    _uploader.action='http://192.168.1.142:11005/product/uploadIcon';
    this.uploader=_uploader;
  }

  //资产负债表
  balance(){
    this.balanceBtn = "btn-primary";
    this.incomeBtn = "activeBgs";
    this.cashFlowBtn = "activeBgs";
    var data = [{time:'2017-01-01',status:0},{time:'2017-01-02',status:0},{time:'2017-01-03',status:0},{time:'2017-01-04',status:0},{time:'2017-01-05',status:0},{time:'2017-01-06',status:0},{time:'2017-01-07',status:0},{time:'2017-01-08',status:0},{time:'2017-01-09',status:0},{time:'2017-01-10',status:0},{time:'2017-01-11',status:0},{time:'2017-01-12',status:0}];
    this.loserRadio = data;
  }

  //净利润表
  income(){
    this.balanceBtn = "activeBgs";
    this.incomeBtn = "btn-primary";
    this.cashFlowBtn = "activeBgs";
    var data = [{time:'2016-01-01',status:1},{time:'2016-01-02',status:1},{time:'2016-01-03',status:1},{time:'2016-01-04',status:1},{time:'2016-01-05',status:1},{time:'2016-01-06',status:1}];
    this.loserRadio = data;
  }

  //现金流量表
  cashFlow(){
    this.balanceBtn = "activeBgs";
    this.incomeBtn = "activeBgs";
    this.cashFlowBtn = "btn-primary";
    var data = [{time:'2015-01-01',status:2},{time:'2015-01-02',status:2},{time:'2015-01-03',status:2},{time:'2015-01-04',status:2},{time:'2015-01-05',status:2},{time:'2015-01-06',status:2},{time:'2015-01-07',status:2},{time:'2015-01-08',status:2},{time:'2015-01-09',status:2},{time:'2015-01-10',status:2},{time:'2015-01-11',status:2},{time:'2015-01-12',status:2}];
    this.loserRadio = data;
  }

  //查看详情
  submitView(_entity){
    if(_entity == 0){   //资产负债表
      this.router.navigate(['./home/balance']);
    }else if(_entity == 1){   //净利润表
      this.router.navigate(['./home/income']);
    }else{   //现金流量表
      this.router.navigate(['./home/cashFlow']);
    }
  }

  @ViewChild('myModalDel')
  modalDel: ModalComponent;
  //删除
  submitDel(_entity){
    this.modalDel.open();
  }

  ngOnInit(){

  }

  evtWriteContract(){
    console.log('contract');
    this.onModal.emit('007');
    this.modal.open();
    var data = [{time:'2015-01-01'},{time:'2015-01-02'},{time:'2015-01-03'},{time:'2015-01-04'},{time:'2015-01-05'},{time:'2015-01-06'},{time:'2015-01-07'},{time:'2015-01-08'},{time:'2015-01-09'},{time:'2015-01-10'},{time:'2015-01-11'},{time:'2015-01-12'}];
    this.loserRadio = data;
  }
  evtUploadContract(){

  }

}
