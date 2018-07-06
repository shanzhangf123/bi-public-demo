import { Injectable, ComponentFactoryResolver, ComponentRef, Injector, EmbeddedViewRef, ApplicationRef } from '@angular/core';
import { DialogComponent } from '../app/dialog/dialog.component';




@Injectable()
export class DialogService {

    container: any;
    dialogComponent: DialogComponent;


    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        public applicationRef: ApplicationRef,
        private injector: Injector) {

    }


    /**
     * 
     */
    addDialog(component: any, data?: any) {
        console.log('添加dialog');
        // this.creatDailogContainer();
        if (!this.dialogComponent) {
            this.dialogComponent = this.creatDailogContainer();
        }
        this.dialogComponent.addComponent(component, data);
    }



    creatDailogContainer(): DialogComponent {
        console.log(666666666666);
        // 组件工厂
        const resolveFactory: any = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);

        // 创建工厂注入器
        const componentRef: ComponentRef<any> = resolveFactory.create(this.injector);

        // 获取注入器rootNodes中第一个数据
        const rootNodes: any = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // 把document body作为容器
        if (!this.container) this.container = document.body;

        // 附加视
        this.applicationRef.attachView(componentRef.hostView);

        // 销毁视图
        componentRef.onDestroy(() => {
            console.log(5555555555);
            this.applicationRef.detachView(componentRef.hostView);
        });

        // 把rootNodes节点插入到container容器中
        this.container.appendChild(rootNodes);

        // 返回实例
        return componentRef.instance;
    }

    removeDialog() {
        this.dialogComponent.destroySelf();
    }


}