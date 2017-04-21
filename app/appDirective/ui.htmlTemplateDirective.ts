/**
 * Created by adin1 on 2017/2/28.
 */
import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector,
  ComponentFactoryResolver
} from '@angular/core';

import { RouterModule }  from '@angular/router';
import { CommonModule } from '@angular/common';


/**
 * 指定html生成组件
 * @param _html html字符串
 * @param _context 组件所在的上下文
 * @param _compile 编译器
 * @returns {Promise<ComponentFactory<any>>}
 */
let createComponentFactory=function(_html,_context,_compile){
  let that=this;
  //组件类
  @Component({
    selector: 'ui-component',
    template: _html,
  })
  class DynamicComponent {
    entity:any=_context;
  }
  //模块类
  @NgModule({ imports: [CommonModule, RouterModule], declarations: [DynamicComponent] })
  class DynamicHtmlModule {
    constructor(){
    }
    ngOnInit(){
    }
  }
  //编译
  return _compile.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(x => x.componentType ===DynamicComponent);
    });
};


@Directive({ selector: '[uiHtml]' })
export class HtmlOutletDirective {
  @Input() html: string;
  @Input() entity:any;
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler,private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit () {
    let that=this;
    let html = that.html;
    if (!html) return;



    //组件类
    // @Component({
    //   selector: 'ui-component',
    //   template: html,
    // })
    // class DynamicComponent {
    //   entity:any=that.entity;
    // }

    //let componentFactory = this._componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    //that.vcRef.clear();
    //let componentRef = that.vcRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;

    if(that.cmpRef) {
      that.cmpRef.destroy();
    }

    //根据组件和编译器来创建对应的组件加工程序（生成组件对应的模块）
    createComponentFactory(html,that.entity,that.compiler)
      .then(factory => {
        // const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        // this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
        this.cmpRef = this.vcRef.createComponent(factory)
      });
  }

  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }
  }


}
