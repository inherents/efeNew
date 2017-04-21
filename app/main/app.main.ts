import { Component, EventEmitter,Output,ViewChild } from '@angular/core';
import {  Router }  from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {AppLoginService,AppPermService} from "../appService/_base";
import {AppSessionUtil} from "../appUtil/_base";

let templateUrl='app/main/app.main.html';

class LoginInfo{
  name:string;
  pwd:string;
}

let userInfo=new LoginInfo();

@Component({

   templateUrl:templateUrl,
  styles: [`
    .login-panel{

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
    this.loginService.login(u.name,u.pwd).then((res:any)=>{
      if(res.flag){
        //登录成功后创建session
        let data=res.data;
        this.session.create(data.token,{
          uid:data.userId
        });

        router.navigate(['./home',{id:9090}]);
      }

    });

  };

}
