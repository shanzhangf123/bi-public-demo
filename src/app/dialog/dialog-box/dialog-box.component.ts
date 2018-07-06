import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'bi-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit, OnDestroy {



  constructor() { }

  @Input() set setDialogData(data: any) {
    if (data) {
      console.log(data, '#########');
    }
  }

  ngOnInit() {
    console.log('dialog-box初始化');
  }


  ngOnDestroy(): void {
    console.log('dialog-box销毁');
    // throw new Error("Method not implemented.");
  }
}
