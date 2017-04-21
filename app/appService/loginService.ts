import { Injectable }  from '@angular/core';
import {Http,Response,ConnectionBackend,Headers,RequestMethod} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import{AppHttpUtil} from '../appUtil/httpUtil';
import {AppPermService} from "./permService";
import {AppUrlConfig} from "../appConfig/urlConfig";


@Injectable()
export class AppLoginService {
  constructor(private httpUtil: AppHttpUtil,private urlConfig:AppUrlConfig){

  }
  /**
   * 用户登录
   */
      login(_name:string,_pass:string){

        return this.httpUtil.ajax({
          url:this.urlConfig.emarketService+'system/login/',
          method:RequestMethod.Post,
          body:{
             loginName:_name,
             password:_pass
          }
        });
      }
}

