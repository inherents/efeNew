import { Component,Output,ViewChild, OnInit } from '@angular/core';
import {  Router }  from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";

let templateUrl='app/companyManage/app.company.html';

@Component({
  templateUrl:templateUrl,
  styles: [`
    .dark-modal .modal-content {
      background-color: #2b669a;
      color: white;
    }
  `]
})

export class AppCompanyComponent implements OnInit  {
  public user: User;
  @ViewChild('myModal')
  modal: ModalComponent;
  filterText:string='';
  company:any={};

  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,private router:Router){
    let that=this;
    var json={
      "code":0,
      "data":{corpName:"上海银沛数据管理有限公司",companyName:"张红军",idCard:"32080319783402",city:"吉林省通化市",address:"上海市徐汇区虹漕路88号越红广场",
      id:"吉林省通化市",createTime:"2011-01-02"},
      "extra":{"pageData":{"pageCount":1,"pageSize":10,"totalCount":10}},
      "flag":true,
      "message":"成功"
    };
    that.company=json.data;
  }

  //修改注册资本
  editCapital(){
    this.modal.open();
  }

  //点击  知道了按钮
  know(){
    this.modals.close();
  }

  @ViewChild('myModals')
  modals: ModalComponent;
  //提交认证
  onSubmit(){
    this.modals.open();
    //this.router.navigate(['./home']);
  }

  @ViewChild('myModalImg')
  modalImg: ModalComponent;
  //查看图片
  lookPic(){
    this.modalImg.open();
  }

  ngOnInit(){
// initialize model here
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  save(model: User, isValid: boolean) {
    // 调用API保存customer
    if(isValid == true){
      this.modal.close();
    }
    console.log(model, isValid);
  }

  evtWriteContract(){
    console.log('contract');
  }

}
