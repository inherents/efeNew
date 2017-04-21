import {Injectable} from "@angular/core";
/**
 * Created by adin1 on 2017/3/25.
 */
@Injectable()
export class UIPagerService{
  private _totalCount:number=0;
  private _pageIndex:number=1;
  private _pageCount:number=1;
  private _pageSize:number=10;
  private _showCount:number=10;
  private _pageChanged:any;
  private _pageIndexList:Array<number>;

  constructor(){
    this._pageIndexList=[];
  }

  get isFirst(){
    return this._pageIndex==1;
  }
  get isLast(){
    return this._pageIndex==this._pageCount;
  }

  get pageCount(){
    return this._pageCount;
  }
  get pages(){
    return this._pageIndexList;
  }

  get pageIndex(){
    return this._pageIndex;
  }

  init(args:any){
    let {pageSize=10,totalCount,pageChanged=(pn,ps)=>{
      console.log(pn,ps);
    }}=args;
    this._pageIndexList = [];
    this._pageCount=totalCount%pageSize==0?totalCount/pageSize:Number.parseInt(totalCount/pageSize)+1;
    this._pageSize=pageSize;
    this._totalCount=totalCount;
    this._pageChanged=pageChanged;
    for(let i=1;i<=this._pageCount;i++){
      this._pageIndexList.push(i);
    }
  }

  toNext(){
    if(this.isLast){
      return;
    }
    this.selectPage(this._pageIndex+1);
  }
  toPrev(){
    if(this.isFirst){
      return;
    }
    this.selectPage(this._pageIndex-1);
  }
  toFirst(){
    if(this.isFirst){
      return;
    }
    this.selectPage(1);
  }
  toLast(){
    if(this.isLast){
      return;
    }
    this.selectPage(this._pageCount);
  }
  toPage(){

  }
  selectPage(pn){
    if(this._pageIndex==pn){return;}
    this._pageIndex=pn;
    this._pageChanged(pn,this._pageSize);
  }
}
