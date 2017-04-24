import { Component, EventEmitter,Output,ViewChild } from '@angular/core';
import {  Router }  from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {AppLoginService,AppPermService} from "../appService/_base";
import {AppSessionUtil} from "../appUtil/_base";
import {loginDirective} from './loginDirective';

let templateUrl='app/main/app.main.html';

class LoginInfo{
  name:string;
  pwd:string;
}

let userInfo=new LoginInfo();

@Component({

   templateUrl:templateUrl,
  styles: [`
    body, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
      font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei";
    }
    label.control-label {
      font-weight: normal;
      font-size: 12px;
      color: #666;
    }
    .form-control {
      height: 36px;
      border-radius: 0px;
      padding: 6px;
      -webkit-transition: none;
      transition: none;
      font-size: 12px;
      border: 1px solid #ddd;
    }
    .login-container {
      background: #fff;
      border: 1px solid #f2f2f2;
      border-radius: 2px;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;
      margin: auto 10px;
      padding: 10px;
    }

    .login-container .login-title {
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      font-size: 1.8em
    }

    .login-container .form-group label.control-label {
      text-align: left;
    }
    .btn {
      font-size: 12px;
      border-radius: 0px;
      padding: 8px 17px;
      height: 36px;
      line-height: 14px;
    }
    .btn-primary:hover {
      color: #fff;
      border: 1px solid #28b5d6;
      background-color: #28b5d6;
    }
  `]
})

export class AppMainComponent {

  constructor(private loginService:AppLoginService,
              private router:Router,
              private permService:AppPermService,
              private session:AppSessionUtil
  ){

  }

  userInfo=userInfo;
  onSubmit=function(){
    var u=this.userInfo;
    let router=this.router;
    router.navigate(['./home',{id:9090}]);
    /*this.loginService.login(u.name,u.pwd).then((res:any)=>{
      if(res.flag){
        //登录成功后创建session
        let data=res.data;
        this.session.create(data.token,{
          uid:data.userId
        });

        router.navigate(['./home',{id:9090}]);
      }

    });*/

  };

}
