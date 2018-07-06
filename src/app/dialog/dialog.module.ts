import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DialogComponent,
    DialogBoxComponent
  ],
  entryComponents: [
    DialogComponent,
    DialogBoxComponent
  ]
})
export class DialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
      ]
    };
  }
}
