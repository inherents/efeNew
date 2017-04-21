import { Injectable }  from '@angular/core';

@Injectable()
export class AppUrlConfig {

  _emarket:string='http://192.168.1.142:11005/';
  // _emarket:string='http://127.0.0.1:49940/';

  constructor(){
  }

  get emarketService(){
    return this._emarket;
  }

}
