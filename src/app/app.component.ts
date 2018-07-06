import { Component, OnInit } from '@angular/core';
// import { DateService } from '../service/date.service';
import { DialogService } from '../service/dialog.service';
import { AddFriendDialogComponent } from './dialog/add-friend-dialog/add-friend-dialog.component';
import { DialogBoxComponent } from './dialog/dialog-box/dialog-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isShowCalendar: boolean;

  constructor(private dialogService: DialogService) {

  }


  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }


  /**
   * 显示弹出窗
   */
  showAlertDialog() {
    console.log('显示弹出窗');
    let data: any = {
      title: '显示弹出窗'
    }
    this.dialogService.addDialog(AddFriendDialogComponent, data);
  }


  showAddDailog() {
    let data: any = {
      title: '加好友数据',
      friend: '周总'
    }
    this.dialogService.addDialog(DialogBoxComponent, data);
  }
  // }

}
