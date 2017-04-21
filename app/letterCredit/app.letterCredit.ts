import {Component, EventEmitter,Output,ViewChild} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {UIUploaderService} from "../appService/_base";


let templateUrl='app/letterCredit/app.letterCredit.html';


@Component({
  templateUrl:templateUrl,
  styles: [`

  `]
})

export class letterCreditComponent{
  private havePicture:boolean;
  private noPicture:boolean;
  private heroState:boolean;
  @Output() onModal = new EventEmitter<string>();
  @ViewChild('myModal')
  modal: ModalComponent;
  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router){
    this.havePicture = true;
    this.noPicture = false;
    this.heroState = false;
  }

  //删除图片，出现弹出层
  deletePerfect(){
    this.modal.open();
  }

  //确认删除
  deletePicSubmit(){
    this.havePicture = false;
    this.noPicture = true;
    this.modal.close();
  }

  //新增征信授权书
  addPicture(){
    this.heroState = true;
  }

  //关闭新增征信授权书
  closeAddModel(){
    this.heroState = false;
  }

  ngOnInit(){
  }

}
