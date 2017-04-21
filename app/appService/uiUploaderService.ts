/**
 * Created by adin1 on 2017/3/25.
 */
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Created by adin1 on 2017/3/25.
 */
@Injectable()
export class UIUploaderService{


  private _headers:any;
  private _action:string;
  private _formData:any;
  constructor(){
  }


  get formData(): any {
    return this._formData;
  }

  set formData(value: any) {
    this._formData = value;
  }
  set action(value: string) {
    this._action = value;
  }
  set headers(value: any) {
    this._headers = value;
  }
  get headers():any{
    return this._headers;
  }
  get action(): string {
    return this._action;
  }

  onComplete(file,res){

  }
  onError(file,res){

  }
}
