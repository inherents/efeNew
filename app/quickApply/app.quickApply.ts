import {Component, EventEmitter,Output,ViewChild} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {UIUploaderService} from "../appService/_base";


let templateUrl='app/quickApply/app.quickApply.html';


@Component({
  templateUrl:templateUrl,
  styles: [`

  `]
})
export class quickApplyComponent {
  currentClasses:any;
  currentClass:any;
  applyClass1:any;
  applyClass2:any;
  applyClass3:any;
  bgFirst:any;
  quickApplyData:any;
  public showBtnApply:boolean;
  public applyIng:boolean;
  public applyDone:boolean;
  public applyRefuse:boolean;

  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router){
    this.currentClasses= 'activeBg';
    this.currentClass= '';
    this.applyClass1 = '';
    this.applyClass2 = 'activeBgs';
    this.applyClass3 = 'activeBgs';
    this.showBtnApply = false;
    this.applyIng = true;
    this.applyDone = false;
    this.applyRefuse = false;
    let jsonArray = [];
    let bgColor = ['oneBg','twoBg','threeBg','fourBg','fiveBg'];

    var json={"code":0,"data":[
      {"driverName":"掌柜三","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"张三","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"李四","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"王五","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"赵六","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"小李","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"刘芳","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"中华","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"佛龙王","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"},
      {"driverName":"贵哥","phone":"18023210021","replyMoney":"19902元","time":"2016-12-23","status":"1","tips":"信息提交不完整，请确认提交完整程度"}],"extra":{"pageData":{"pageCount":1,"pageSize":10,"totalCount":10}},"flag":true,"message":"成功"};
    $.each(json.data, function (key,val) {
      if(key>4){
        this.bgFirst = bgColor[key-(5*(parseInt(key/5)))];
      }else{
        this.bgFirst = bgColor[key];
      }
      jsonArray.push({
        driverName:val.driverName,
        phone:val.phone,
        replyMoney:val.replyMoney,
        time:val.time,
        driverNameFirst:val.driverName.charAt(0),
        tips:val.tips,
        bgFirst:this.bgFirst
      })
    });
    this.quickApplyData = jsonArray;
  }

  doneApply(_entity){
    this.applyIng = true;
    this.applyDone = false;
    this.applyRefuse = false;
    if(_entity == 0){
      this.showBtnApply = false;
      this.currentClasses= 'activeBg';
      this.currentClass= '';
    }else{
      this.showBtnApply = true;
      this.currentClasses= '';
      this.currentClass= 'activeBg';
    }
  }

  //申请按钮选择颜色变化
  applyStatus(_entity){
    if(_entity == 0){
      this.applyClass1 = '';
      this.applyClass2 = 'activeBgs';
      this.applyClass3 = 'activeBgs';
      this.applyIng = true;
      this.applyDone = false;
      this.applyRefuse = false;
    }else if(_entity == 1){
      this.applyClass1 = 'activeBgs';
      this.applyClass2 = '';
      this.applyClass3 = 'activeBgs';
      this.applyIng = false;
      this.applyDone = true;
      this.applyRefuse = false;
    }else{
      this.applyClass1 = 'activeBgs';
      this.applyClass2 = 'activeBgs';
      this.applyClass3 = '';
      this.applyIng = false;
      this.applyDone = false;
      this.applyRefuse = true;
  }
  }

  //点击申请按钮跳转
  applyProduct(){
    this.router.navigate(['./home/perfectReport']);
  }

  ngOnInit(){
  }

}
