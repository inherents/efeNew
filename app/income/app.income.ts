
import {Component, EventEmitter,Output,ViewChild} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharkToastrService } from '@ntesmail/shark-angular2/index';
import {UIUploaderService} from "../appService/_base";


let templateUrl='app/income/app.income.html';


@Component({
  templateUrl:templateUrl,
  styleUrls: []
})
export class incomeComponent {
  sheetData:any;
  param:any;
  calculParme:any;

  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router,private sharkToastrService: SharkToastrService){
    let that=this;
    that.sheetData = {
      company:"",
      profit:{}
    };
    this.param = {
      reportTime: "",
      money001: "",
      money002: "",
      money003: "",
      money004: "",
      money005: "",
      money006: "",
      money007: "",
      money008: "",
      money009: "",
      money011: "",
      money012: "",
      money013: "",
      money014: "",
      money016: "",
      money018: "",
      money019: "",
      money020: "",
      money021: "",
      money022: "",
      money023: "",
      money024: "",
      money025: "",
      money026: "",
      money028: "",
      money029: "",
      money030: "",
      money031: "",
      money033: ""
    };
    this.calculParme ={
      money010: 0,
      money027: 0,
      money015: 0,
      money032: 0,
      money017: 0,
      money034: 0
    };
  }

  add() {
    let rtn = 0;
    for (let i in arguments) {
      if (arguments[i] == "" || arguments[i] == null || arguments[i].toString().length == 0 || arguments[i].toString().trim().length == 0 || isNaN(arguments[i])) continue;
      let _arg = parseFloat(arguments[i].toString().trim());
      rtn = parseFloat((_arg + rtn).toFixed(2));
    }
    return rtn;
  };

  calculationMoney010(){
    let num1 = this.add(this.param.money001, this.param.money008, this.param.money009);
    let num2 = this.add(this.param.money002, this.param.money003, this.param.money004,
      this.param.money005, this.param.money006, this.param.money007);
    this.calculParme.money010 = parseFloat((num1 - num2).toFixed(2));
  };
  calculationMoney027() {
    let num1 = this.add(this.param.money018, this.param.money025, this.param.money026);
    let num2 = this.add(this.param.money019, this.param.money020, this.param.money021,
      this.param.money022, this.param.money023, this.param.money024);
    this.calculParme.money027 = parseFloat((num1 - num2).toFixed(2));
};
  calculationMoney015() {
    let num1 = this.add(this.calculParme.money010, this.param.money011);
    let num2 = this.add(this.param.money013);
    this.calculParme.money015 = parseFloat((num1 - num2).toFixed(2));
};
  calculationMoney017() {
    let num1 = this.add(this.calculParme.money015);
    let num2 = this.add(this.param.money016);
    this.calculParme.money017 = parseFloat((num1 - num2).toFixed(2));
};
  calculationMoney032() {
    let num1 = this.add(this.calculParme.money027, this.param.money028);
    let num2 = this.add(this.param.money030);
    this.calculParme.money032 = parseFloat((num1 - num2).toFixed(2));
};
  calculationMoney034() {
    let num1 = this.add(this.calculParme.money032);
    let num2 = this.add(this.param.money033);
    this.calculParme.money034 = parseFloat((num1 - num2).toFixed(2));
};

  onChange(){
    this.calculationMoney010();
    this.calculationMoney027();
    this.calculationMoney015();
    this.calculationMoney032();
    this.calculationMoney017();
    this.calculationMoney034();
  }

  returnBackList(){
    this.router.navigate(['./home/financialReport']);
  }

  ngOnInit(){

  }

  evtUploadContract(){

  }

}
