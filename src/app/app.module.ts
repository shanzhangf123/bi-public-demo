import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BiCalendarComponent } from './bi-calendar/bi-calendar.component';
import { DateService } from '../service/date.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../service/dialog.service';
import { DialogModule } from './dialog/dialog.module';
import { AddFriendDialogComponent } from './dialog/add-friend-dialog/add-friend-dialog.component';
// import { AddFriendDialogComponent } from './add-friend-dialog/add-friend-dialog.component';
// import { DialogBoxComponent } from './dialog-box/dialog-box.component';


@NgModule({
  declarations: [
    AppComponent,
    BiCalendarComponent,
    AddFriendDialogComponent,
    // AddFriendDialogComponent,
    // DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // FormModule,
    DialogModule,
  ],
  providers: [DateService, DialogService],
  bootstrap: [AppComponent],
  entryComponents: [AddFriendDialogComponent]
})
export class AppModule { }
