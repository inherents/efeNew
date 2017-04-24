import { Component, EventEmitter,Output,ViewChild  } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {AppPermService} from "../appService/permService";
import {AppSessionUtil} from "../appUtil/_base";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
/*import  * as echarts from '../../node_modules/echarts/lib/echarts.js';*/

let templateUrl='app/welcome/app.welcome.html';

@Component({
   templateUrl:templateUrl,
  styles: [`
   .viewContainer .viewContainer-sidebar  .sidebar-title {
      height: 40px;
      background: #22282e;
      color: #fff;
      line-height: 40px;
      position: relative;
      margin-bottom: 1px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
  }
   .viewContainer .viewContainer-sidebar .nav-item{
    line-height:0;
   }
  .viewContainer .viewContainer-sidebar .nav-item > a {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      align-items: center;
      justify-content: flex-start;
  }
  .viewContainer .viewContainer-sidebar  .nav-icon {
      width: 50px;
      text-align: center;
      color: #aeb9c2;
  }
  .viewContainer .viewContainer-sidebar .nav-title {
      overflow: hidden;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      width: 130px;
  }
  `]
})

export class AppWelcomeComponent {
  @Output() onModal = new EventEmitter<string>();
  @ViewChild('myModal')
  modal: ModalComponent;
  menuList:any[]=[];
  loading:boolean=false;
  txtName:string='';
  txtName2:string='';
  private userId:string='';
  private returnBtn:boolean;
  evtClick(){
    console.log(this.txtName);
  }
  evtClick2(){
    console.log(this.txtName2);
  }
  constructor(permSerivce:AppPermService,sessionUtil:AppSessionUtil,private aRoute: ActivatedRoute,private router: Router){
    this.returnBtn = false;
    let that=this;
    that.userId=sessionUtil.userInfo(true).uid;
    that.txtName='Admin';

    console.log('welcome');

    let getMenu=function (rep) {

      var dicMenu={
        m1:{
          icon:"fa fa-th-list fa-lg",
          url:"../home"
        },
        m2:{
          icon:"fa fa-th-list fa-lg",
          url:"company"
        }
      };

      var getTreeData = function(_pid, _data) {

        var tmp = [];

        _data.forEach(function(_n, _i) {

          if (_n.parentId == _pid) {
            var dicId=dicMenu['m'+_n.code];
            var item = {
              id: _n.id,
              label: _n.dirName,
              children: [],
              status:1,
              icon:dicId==undefined?"":dicId.icon,
              url:dicId==undefined?"":dicId.url,
              c_menushow:true,
              son_menushow:true
            };
            var c = getTreeData(_n.id, _data);

            if (c.length == 0) {
              tmp.push(item);
              return false;
            } else {
              item.children = c;
              tmp.push(item);
            }
          }
        });
        return tmp;

      };

      that.menuList = getTreeData(-1, rep.data);

    };

    getMenu({
      flag:true,
      data:[
        {"code":"1","dirName":"我的首页","id":1,"parentId":-1},
        {"code":"2","dirName":"企业认证","id":2,"parentId":-1}
      ]
    });

    //permSerivce.getUserMenu(that.userId).then(getMenu);
  }

  ngOnInit(){
    let id=this.aRoute.params
      .subscribe(params=>{
        console.log(params["id"]);
        if(params["id"] == 9090){
          this.evtWriteContract();
        }
      });

    let option = {
      title: {
        text: '堆叠区域图'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'直接访问',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
/*     console.log(document.querySelector('#chartc'));
    var charts=echarts.init(document.querySelector('#chartc'));
     charts.setOption(option);*/
  }

  evtWriteContract(){
    this.onModal.emit('007');
    this.modal.open();
  }

  backTo(){
    this.router.navigate(['./home']);
    this.returnBtn = false;
  }

  goRegiter(){
    this.modal.close();
    this.router.navigate(['./home/company']);
  }


}
