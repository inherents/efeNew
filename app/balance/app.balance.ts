import {Component, EventEmitter,Output,ViewChild} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {UIUploaderService} from "../appService/_base";
import { SharkToastrService } from '@ntesmail/shark-angular2/index';


let templateUrl='app/balance/app.balance.html';


@Component({
  templateUrl:templateUrl,
  styleUrls: ['']
})
export class balanceComponent {
  sheetData:any;
  uploader:UIUploaderService;
  currentAssetsEnd = {};            //流动资产      期末
  currentAssetsBegin = {};        //流动资产      年初
  uncurrentAssetsEnd = {};        //非流动资产    期末
  uncurrentAssetsBegin = {};    //非流动资产    年初
  flowloadEnd = {};                      //流动负债      期末
  otherFlowloadBegin = {};        //其他流动负债      年初
  unFlowloadEndEnd = {};            //非流动负债合计      期末
  unFlowloadEndStart = {};            //非流动负债合计      年初
  shareholderInterestEnd  = {};         //股东权益合计      期末
  shareholderInterestBegin  = {};         //股东权益合计     年初
  money219:any;
  money319:any;
  money609:any;
  money709:any;
  money810:any;
  money910:any;

  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router,private sharkToastrService: SharkToastrService){
    let that=this;
    this.currentAssetsEnd.money014 = 0;//流动资产合计 期末 总
    this.currentAssetsBegin.money114 = 0;//流动资产合计 年初 总
    this.uncurrentAssetsEnd.money218 = 0;//非流动资产合计 期末  总
    this.uncurrentAssetsBegin.money318 = 0;//非流动资产合计 年初  总
    this.flowloadEnd.money413 = 0;       //流动负债合计            期末
    this.otherFlowloadBegin.money513 = 0;//其他流动负债合计        年初
    this.unFlowloadEndEnd.money608 = 0;//非流动负债合计           期末
    this.unFlowloadEndStart.money708 = 0;//非流动负债合计       年初
    this.shareholderInterestEnd.money809 = 0;//股东权益合计       期末
    this.shareholderInterestBegin.money909 = 0;//股东权益合计       年初
    let money609Num = parseFloat(parseFloat(this.money609).toFixed(2));
    let money709Num = parseFloat(parseFloat(this.money709).toFixed(2));

    this.money219 = parseFloat(this.uncurrentAssetsEnd.money218+this.currentAssetsEnd.money014).toFixed(2);//资产总计 期末
    this.money319 = parseFloat(this.uncurrentAssetsBegin.money318+this.currentAssetsBegin.money114).toFixed(2);//资产总计 年初
    this.money609 = parseFloat(this.flowloadEnd.money413+this.unFlowloadEndEnd.money608).toFixed(2);//负债合计 期末
    this.money709 = parseFloat(this.otherFlowloadBegin.money513+this.unFlowloadEndStart.money708).toFixed(2);//负债合计 年初
    this.money810 = parseFloat(this.strTOnum(this.money609)+this.shareholderInterestEnd.money809).toFixed(2);//负债和股东权益总计       期末
    this.money910 = parseFloat(this.strTOnum(this.money709)+this.shareholderInterestBegin.money909).toFixed(2);//负债和股东权益总计       年初

    that.sheetData = {
      company:"",
      balance:{}
    };
    _uploader.headers={
      'TOKEN':sessionUtil.userInfo(true).token
    };
    _uploader.action='http://192.168.1.142:11005/product/uploadIcon';
    this.uploader=_uploader;
  }

  returnBackList(){
    this.router.navigate(['./home/financialReport']);
  }

  add(obj){
    var rtn = 0;
    for(var i in obj){
      if (obj[i] == "" || obj[i] == null || obj[i].toString().length == 0 ||obj[i].toString().trim().length == 0|| isNaN(obj[i])) continue;
      var _arg = parseFloat(obj[i].toString().trim());
      rtn = parseFloat((_arg+rtn).toFixed(2));
    }
    return rtn;
  };

  strTOnum(str){
      return parseFloat(parseFloat(str).toFixed(2));
  };

  ngOnInit(){
    this.currentAssetsEnd.param = {
      money001:"",
      money002:"",
      money003:"",
      money004:"",
      money005:"",
      money006:"",
      money007:"",
      money008:"",
      money009:"",
      money010:"",
      money011:"",
      money012:"",
      money013:""
    };
    this.currentAssetsBegin.param  = {
      money101:"",
      money102:"",
      money103:"",
      money104:"",
      money105:"",
      money106:"",
      money107:"",
      money108:"",
      money109:"",
      money110:"",
      money111:"",
      money112:"",
      money113:""
    };
    this.uncurrentAssetsEnd.param = {
      money201:"",
      money202:"",
      money203:"",
      money204:"",
      money205:"",
      money206:"",
      money207:"",
      money208:"",
      money209:"",
      money210:"",
      money211:"",
      money212:"",
      money213:"",
      money214:"",
      money215:"",
      money216:"",
      money217:""
    };
    this.uncurrentAssetsBegin.param = {
      money301:"",
      money302:"",
      money303:"",
      money304:"",
      money305:"",
      money306:"",
      money307:"",
      money308:"",
      money309:"",
      money310:"",
      money311:"",
      money312:"",
      money313:"",
      money314:"",
      money315:"",
      money316:"",
      money317:""
    };
    this.flowloadEnd.param = {
      money401:"",
      money402:"",
      money403:"",
      money404:"",
      money405:"",
      money406:"",
      money407:"",
      money408:"",
      money409:"",
      money410:"",
      money411:"",
      money412:""
    };
    this.otherFlowloadBegin.param  = {
      money501:"",
      money502:"",
      money503:"",
      money504:"",
      money505:"",
      money506:"",
      money507:"",
      money508:"",
      money509:"",
      money510:"",
      money511:"",
      money512:""
    };
    this.unFlowloadEndEnd.param = {
      money601:"",
      money602:"",
      money603:"",
      money604:"",
      money605:"",
      money606:"",
      money607:""
    };
    this.unFlowloadEndStart.param ={
      money701:"",
      money702:"",
      money703:"",
      money704:"",
      money705:"",
      money706:"",
      money707:""
    };
    this.shareholderInterestEnd.param = {
      money801:"",
      money802:"",
      money803:"",
      money804:"",
      money805:"",
      money806:"",
      money807:"",
      money808:""
    };
    this.shareholderInterestBegin.param = {
      money901:"",
      money902:"",
      money903:"",
      money904:"",
      money905:"",
      money906:"",
      money907:"",
      money908:""
    };
  }

  onChange(){
    this.currentAssetsEnd.money014 = this.add(this.currentAssetsEnd.param);
    this.unFlowloadEndStart.money708 = this.add(this.unFlowloadEndStart.param);
    this.money709 = this.otherFlowloadBegin.money513+this.unFlowloadEndStart.money708;
    this.money910 = parseFloat(this.strTOnum(this.money709)+this.shareholderInterestBegin.money909).toFixed(2);
    this.unFlowloadEndEnd.money608 = this.add(this.unFlowloadEndEnd.param);
    this.money609 = parseFloat(this.flowloadEnd.money413+this.unFlowloadEndEnd.money608).toFixed(2);
    this.money810 = parseFloat(this.strTOnum(this.money609)+this.shareholderInterestEnd.money809).toFixed(2);
    this.otherFlowloadBegin.money513 = this.add(this.otherFlowloadBegin.param);
    this.money709 = parseFloat(this.otherFlowloadBegin.money513+this.unFlowloadEndStart.money708).toFixed(2);
    this.money910 = parseFloat(this.strTOnum(this.money709)+this.shareholderInterestBegin.money909).toFixed(2);
    this.flowloadEnd.money413 = this.add(this.flowloadEnd.param);
    this.money609 = parseFloat(this.flowloadEnd.money413+this.unFlowloadEndEnd.money608).toFixed(2);
    this.money810 = parseFloat(this.strTOnum(this.money609)+this.shareholderInterestEnd.money809).toFixed(2);
    this.uncurrentAssetsBegin.money318 = this.add(this.uncurrentAssetsBegin.param);
    this.money319 = parseFloat(this.uncurrentAssetsBegin.money318+this.currentAssetsBegin.money114).toFixed(2);
    this.uncurrentAssetsEnd.money218 = this.add(this.uncurrentAssetsEnd.param);
    this.money219 = parseFloat(this.uncurrentAssetsEnd.money218+this.currentAssetsEnd.money014).toFixed(2);
    this.currentAssetsBegin.money114 = this.add(this.currentAssetsBegin.param);
    this.money319 = parseFloat(this.uncurrentAssetsBegin.money318+this.currentAssetsBegin.money114).toFixed(2);
    this.currentAssetsEnd.money014 = this.add(this.currentAssetsEnd.param);
    this.money219 = parseFloat(this.uncurrentAssetsEnd.money218+this.currentAssetsEnd.money014).toFixed(2);
    this.shareholderInterestEnd.money809 = this.add(this.shareholderInterestEnd.param);
    this.money810 = parseFloat(this.strTOnum(this.money609)+this.shareholderInterestEnd.money809).toFixed(2);
    this.shareholderInterestBegin.money909 = this.add(this.shareholderInterestBegin.param);
    this.money910 = parseFloat(this.strTOnum(this.money709)+this.shareholderInterestBegin.money909).toFixed(2);
  }

  save(model: User, isValid: boolean) {
    // 调用API保存customer
    if((this.money219  != this.money810)){
      var str ="期末资产总计:"+ this.money219+"不等于 期末负债和股东（或所有者）权益总计:"+this.money810+".内部勾稽验证不通过";
      this.sharkToastrService.error(str);
      return ;
    }
    if((this.money319 != this.money910)){
      var str ="年初资产总计:"+ this.money319+"不等于 年初负债和股东（或所有者）权益总计:"+this.money910+".内部勾稽验证不通过";
      this.sharkToastrService.error(str);
      return ;
    }
    if(this.money219 == 0){
      var str ="期末资产总计不能为0";
      this.sharkToastrService.error(str);
      return ;
    }
    if(this.money810 == 0){
      var str ="期末资产总计不能为0";
      this.sharkToastrService.error(str);
      return ;
    }
    if(isValid == true){
      var obj = angular.extend({},
        this.currentAssetsEnd.param,
        this.currentAssetsBegin.param,
        this.uncurrentAssetsEnd.param,
        this.uncurrentAssetsBegin.param,
        this.flowloadEnd.param,
        this.otherFlowloadBegin.param,
        this.unFlowloadEndEnd.param,
        this.unFlowloadEndStart.param,
        this.shareholderInterestEnd.param,
        this.shareholderInterestBegin.param
      );
      obj.money014 = this.currentAssetsEnd.money014;
      obj.money114 = this.currentAssetsBegin.money114;
      obj.money218 = this.uncurrentAssetsEnd.money218;
      obj.money318 = this.uncurrentAssetsBegin.money318;
      obj.money413 = this.flowloadEnd.money413;
      obj.money513 = this.otherFlowloadBegin.money513;
      obj.money608 = this.unFlowloadEndEnd.money608;
      obj.money708 = this.unFlowloadEndStart.money708;
      obj.money809 = this.shareholderInterestEnd.money809;
      obj.money909 = this.shareholderInterestBegin.money909;

      obj.money219 = this.money219;
      obj.money319 = this.money319;
      obj.money609 = this.money609;
      obj.money709 = this.money709;
      obj.money810 = this.money810;
      obj.money910 = this.money910;
      this.modal.close();
    }
  }

  test(){
    //alert('aa');
    console.log(this.sharkToastrService);
    this.sharkToastrService.success('成功！');
  }

  evtUploadContract(){

  }

}
