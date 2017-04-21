import { Injectable }  from '@angular/core';
import {RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import{AppHttpUtil} from '../appUtil/_base';
import {AppUrlConfig} from "../appConfig/urlConfig";


@Injectable()
export class AppPermService {
  constructor(private httpUtil: AppHttpUtil,private urlConfig:AppUrlConfig){

  }

  /**
   * 获取用户的菜单
   * @param userId
   * @returns {Promise<TResult>|Promise<TResult>}
   */
  getUserMenu(userId:any){
         let that=this;

        return that.httpUtil.ajax({
          url:that.urlConfig.emarketService+'system/menu/'+userId,
          method:RequestMethod.Get
        });
      }
}
