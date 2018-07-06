import { Component, OnInit, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'bi-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  private componentRef: ComponentRef<any>;
  @ViewChild('element', { read: ViewContainerRef }) public element: ViewContainerRef;

  // @ViewChild(DynamicLoadContainerDirective) dynamicLoadContainer: DynamicLoadContainerDirective;

  constructor(public componentFactory: ComponentFactoryResolver) { }

  ngOnInit() {
    // this.componentRef = dynamicLoadContainer.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(BoxContainerComponent));
  }


  addComponent(component: any, data?: any) {
    console.log(333333333);
    let classList: any = this.element.element.nativeElement.classList;
    classList.remove('dialog-animation-leave');
    classList.add('dialog-animation');
    const componentFactory: any = this.componentFactory.resolveComponentFactory(component);
    this.componentRef = this.element.createComponent(componentFactory);
    // console.log('ssssdd', );
    this.componentRef.instance.setDialogData = data;
  }




  destroySelf() {
    this.componentRef.destroy();
    let classList: any = this.element.element.nativeElement.classList;
    classList.add('dialog-animation-leave');
    classList.remove('dialog-animation');
  }

}
