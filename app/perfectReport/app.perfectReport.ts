import {Component, EventEmitter,Output,ViewChild} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {UIUploaderService} from "../appService/_base";


let templateUrl='app/perfectReport/app.perfectReport.html';


@Component({
  templateUrl:templateUrl,
  styles: [`

  `]
})
export class perfectReportComponent {
  currentClasses:any;
  currentClass:any;
  public applyBtn : boolean;
  public seeDriverLisence:boolean;
  public seeRunLisence:boolean;
  public seePersonalMsg:boolean;

  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router){
    this.currentClasses= 'activeBg';
    this.currentClass= '';
    this.applyBtn = true;
    this.seeDriverLisence = false;
    this.seeRunLisence = false;
    this.seePersonalMsg = false;
  }

  doneApply(_entity){
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


  //查看驾驶证
  driverLisence(){
    this.applyBtn = false;
    this.seeDriverLisence = true;
    this.seeRunLisence = false;
    this.seePersonalMsg = false;
  }

  //查看行驶证
  runLisence(){
    this.applyBtn = false;
    this.seeDriverLisence = false;
    this.seeRunLisence = true;
    this.seePersonalMsg = false;
  }

  //查看个人信息
  personalMsg(){
    this.applyBtn = false;
    this.seeDriverLisence = false;
    this.seeRunLisence = false;
    this.seePersonalMsg = true;
  }

  //返回  申请信息
  backApplyMsg(){
    this.applyBtn = true;
    this.seeDriverLisence = false;
    this.seeRunLisence = false;
    this.seePersonalMsg = false;
  }

  ngOnInit(){
  }

}
