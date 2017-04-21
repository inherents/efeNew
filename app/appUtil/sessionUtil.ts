/**
 * Created by adin1 on 2016/12/9.
 */
import { Injectable } from '@angular/core';

let sessionKey='app_market_admin';
let sesUserInfo:any=null;

@Injectable()
export class AppSessionUtil {

  constructor(){
    console.log('session init');

   // this.sid=Math.random()*1000+'';
  }

  userInfo(isJson:boolean=false){
    let val=localStorage.getItem(sessionKey);
    if(val==null){return {
      token:'',
      uid:'',
    };}
    return  isJson?JSON.parse(val):val;
  };

  create(token:string,data:any) {
    let ses={
      token:token,
      uid:data.uid,
      expiredDate:(new Date().getTime())+1000*60*60*24*30
    };
    var that=this;
    sesUserInfo=data;
    localStorage.setItem(sessionKey,JSON.stringify(ses));
  };

  destroy() {
    localStorage.removeItem(sessionKey);
    sesUserInfo=null;
  };

  expired() {
    let val=localStorage.getItem(sessionKey);
    if(val==null){return true;}

    let ses=JSON.parse(val);
    let dtNow=new Date().getTime();
    /*token有效期为1个月,login时会设置这个时间*/
    if(ses.expiredDate==undefined || ses.expiredDate<dtNow){
      this.destroy();
  }
  }

}
