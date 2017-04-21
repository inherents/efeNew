import { Injectable } from '@angular/core';
import { Http, Response, ConnectionBackend, Headers, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import{AppSessionUtil} from '../appUtil/sessionUtil';
@Injectable()
export class AppHttpUtil {
  constructor(private http: Http,private sessionUtil:AppSessionUtil) {

  }

/**
 * 发送ajax请求
 */
  public ajax(_option: RequestOptionsArgs) {


    // url : string
    // method : string|RequestMethod
    // search : string|URLSearchParams
    // headers : Headers
    // body : any
    // withCredentials : boolean
    // responseType : ResponseContentType

  let that=this;
  let token=that.sessionUtil.userInfo(true).token;

    //设置公共头请求
    let headers = new Headers();
    headers.append('TOKEN', token);


    let option = Object.assign({
      method: RequestMethod.Get,
      headers: headers
    }, _option);


    if (option.method == RequestMethod.Get) {
      return this.get(option.url, option);
    } else if (option.method == RequestMethod.Post) {
      return this.post(option.url, option);
    }
  }


/**
 * 发送get请求
 */
  private get(_url: string, _args: RequestOptionsArgs) {
    //noinspection TypeScriptUnresolvedFunction
  return this.http.get(_url, _args).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

/**
 * 发送post请求
 */
  private post(_url: string, _args: RequestOptionsArgs) {
    //noinspection TypeScriptUnresolvedFunction
  return this.http.post(_url, _args.body, _args).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  private put() { }

/**
 * 服务器错误友好提示
 */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject({
      flag:false,
      message:'网络异常'
    });
  }

}
