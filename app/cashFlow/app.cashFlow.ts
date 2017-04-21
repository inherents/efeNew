import {Component, EventEmitter,Output,ViewChild} from '@angular/core';
import {  Router }  from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharkToastrService } from '@ntesmail/shark-angular2/index';
import {UIUploaderService} from "../appService/_base";


let templateUrl='app/cashFlow/app.cashFlow.html';


@Component({
  templateUrl:templateUrl,
  styleUrls: []
})
export class cashFlowComponent {
  param:any;
  calculParme:any;
  calculAgainParme:any;
  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,_uploader:UIUploaderService,private router:Router,private sharkToastrService: SharkToastrService){
    let that=this;
    this.param = {
      reportDate: "",
      money002: "",
      money003: "",
      money004: "",
      money006: "",
      money007: "",
      money008: "",
      money009: "",
      money013: "",
      money014: "",
      money015: "",
      money016: "",
      money018: "",
      money019: "",
      money020: "",
      money024: "",
      money025: "",
      money026: "",
      money028: "",
      money029: "",
      money030: "",
      money033: "",
      money034: "",
      money036: "",
      money037: "",
      money038: "",
      money040: "",
      money041: "",
      money042: "",
      money043: "",
      money047: "",
      money048: "",
      money049: "",
      money050: "",
      money052: "",
      money053: "",
      money054: "",
      money058: "",
      money059: "",
      money060: "",
      money062: "",
      money063: "",
      money064: "",
      money067: "",
      money068: ""
    };

    this.calculParme = {
      money005: 0,
      money010: 0,
      money017: 0,
      money021: 0,
      money027: 0,
      money031: 0,
      money039: 0,
      money044: 0,
      money051: 0,
      money055: 0,
      money061: 0,
      money065: 0
    };

    this.calculAgainParme = {
      money011: 0,
      money022: 0,
      money032: 0,
      money045: 0,
      money056: 0,
      money066: 0
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

  calculationAgainMoney011() {
    let num1 = this.add(this.calculParme.money005);
    let num2 = this.add(this.calculParme.money010);
    let num3 = parseFloat((num1 - num2).toFixed(2));
    this.calculAgainParme.money011 = num3;
};
  calculationAgainMoney022() {
    let num1 = this.add(this.calculParme.money017);
    let num2 = this.add(this.calculParme.money021);
    let num3 = parseFloat((num1 - num2).toFixed(2));
    this.calculAgainParme.money022 = num3;
};
  calculationAgainMoney032() {
    let num1 = this.add(this.calculParme.money027);
    let num2 = this.add(this.calculParme.money031);
    let num3 = parseFloat((num1 - num2).toFixed(2));
    this.calculAgainParme.money032 = num3;
};
  calculationAgainMoney045() {
    let num1 = this.add(this.calculParme.money039);
    let num2 = this.add(this.calculParme.money044);
    let num3 = parseFloat((num1 - num2).toFixed(2));
    this.calculAgainParme.money045 = num3;
};
  calculationAgainMoney056() {
    let num1 = this.add(this.calculParme.money051);
    let num2 = this.add(this.calculParme.money055);
    let num3 = parseFloat((num1 - num2).toFixed(2));
    this.calculAgainParme.money056 = num3;
};
  calculationAgainMoney066() {
    let num1 = this.add(this.calculParme.money061);
    let num2 = this.add(this.calculParme.money065);
    let num3 = parseFloat((num1 - num2).toFixed(2));
    this.calculAgainParme.money066 = num3;
};

  calculationMoney005() {
    this.calculParme.money005 = this.add(this.param.money002, this.param.money003, this.param.money004)
};
  calculationMoney010() {
    this.calculParme.money010 = this.add(this.param.money006, this.param.money007, this.param.money008, this.param.money009)
};
  calculationMoney017() {
    this.calculParme.money017 = this.add(this.param.money013, this.param.money014, this.param.money015, this.param.money016);
};
  calculationMoney021() {
    this.calculParme.money021 = this.add(this.param.money018, this.param.money019, this.param.money020);
};
  calculationMoney027() {
    this.calculParme.money027 = this.add(this.param.money024, this.param.money025, this.param.money026);
};
  calculationMoney031() {
    this.calculParme.money031 = this.add(this.param.money028, this.param.money029, this.param.money030);
};
  calculationMoney039() {
    this.calculParme.money039 = this.add(this.param.money036, this.param.money037, this.param.money038);
};
  calculationMoney044() {
    this.calculParme.money044 = this.add(this.param.money040, this.param.money041, this.param.money042, this.param.money043);
};
  calculationMoney051() {
    this.calculParme.money051 = this.add(this.param.money047, this.param.money048, this.param.money049, this.param.money050);
};
  calculationMoney055() {
    this.calculParme.money055 = this.add(this.param.money052, this.param.money053, this.param.money054);
};
  calculationMoney061() {
    this.calculParme.money061 = this.add(this.param.money058, this.param.money059, this.param.money060);
};
  calculationMoney065() {
    this.calculParme.money065 = this.add(this.param.money062, this.param.money063, this.param.money064);
};

  onChange(){
    this.calculationMoney005();
    this.calculationMoney010();
    this.calculationMoney017();
    this.calculationMoney021();
    this.calculationMoney027();
    this.calculationMoney031();
    this.calculationMoney039();
    this.calculationMoney044();
    this.calculationMoney051();
    this.calculationMoney055();
    this.calculationMoney061();
    this.calculationMoney065();
    this.calculationAgainMoney011();
    this.calculationAgainMoney022();
    this.calculationAgainMoney032();
    this.calculationAgainMoney045();
    this.calculationAgainMoney056();
    this.calculationAgainMoney066();
  }

  returnBackList(){
    this.router.navigate(['./home/financialReport']);
  }

  ngOnInit(){

  }
  evtUploadContract(){

  }

}
