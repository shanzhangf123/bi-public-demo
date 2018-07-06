import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../../service/dialog.service';

@Component({
  selector: 'bi-add-friend-dialog',
  templateUrl: './add-friend-dialog.component.html',
  styleUrls: ['./add-friend-dialog.component.scss']
})
export class AddFriendDialogComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  @Input() set setDialogData(data: any) {
    if (data) {
      console.log(data, '>>>>>>');
    }
  }


  cancelEvent() {
    console.log('取消并且关闭');
    this.dialogService.removeDialog();
  }

  sendEvent() {
    console.log('同意并且关闭');
    this.dialogService.removeDialog();
  }



}
