import { Component, OnInit } from '@angular/core';
import { DateService } from '../../service/date.service';

@Component({
  selector: 'app-bi-calendar',
  templateUrl: './bi-calendar.component.html',
  styleUrls: ['./bi-calendar.component.scss']
})
export class BiCalendarComponent implements OnInit {


  // title = 'app';
  dateWord = {
    //月份
    month: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],

    monthShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //周
    week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday']
  };

  currentDate: any = {
    year: '',
    month: 0,
    monthLength: '',
    dateStr: ''
  }
  dateInstance: Date;

  //当前日历显示的天的数组
  showDateArray: any[] = [];
  isShowAllMonth: boolean;
  showYearArray: any[] = [];
  isShowAllYear: boolean;


  constructor(private dateService: DateService) {

  }


  ngOnInit(): void {
    this.dateInstance = new Date();
    this.currentDate.monthLength = this.getMonthDay(this.dateInstance.getFullYear(), this.dateInstance.getMonth());
    this.currentDate.month = this.dateInstance.getMonth();
    this.currentDate.year = this.dateInstance.getFullYear();
    this.currentDate.day = this.dateInstance.getDate();
    this.currentDate.dateStr = this.currentDate.year + '-' + this.formatMonth(this.currentDate.month) + '-' + this.formatDay(this.currentDate.day);
    this.dateInstance.setDate(1);
    this.initShowCalendar();
    this.initYearArray(this.currentDate.year);
  }

  /**
   * 初始化当月日历
   */

  initShowCalendar() {
    this.showDateArray = [];
    let fristDay: number = this.dateInstance.getDay();
    if (fristDay != 0) {
      this.setBeforeDay(fristDay);
    }
    this.setMonthDay(this.currentDate.monthLength);
    this.dateInstance.setDate(this.currentDate.monthLength);
    let lastDay: number = this.dateInstance.getDay();
    if (lastDay != 6) {
      this.setAfterDay(lastDay);
    }
  }

  /**
   * 初始化 年份 选择范围
   * 当年年份 前70年 到后 30年
   */
  initYearArray(year: number) {
    console.log('dddddd', year);
    let firstYear: number = year - 70;
    let lastYear: number = year + 30;
    for (let i = firstYear; i <= lastYear; i++) {
      this.showYearArray.push(i);
    }
  }




  /**
   * 填充当月日期
   */
  setMonthDay(monthDay) {
    console.log(this.currentDate.day);
    for (let day = 1; day <= monthDay; day++) {
      // //初始化对象
      let newDay: any = this.formatDay(day);
      let curDateIn = this.initDateObj();
      curDateIn.year = this.currentDate.year;
      curDateIn.month = this.currentDate.month;
      curDateIn.day = newDay;
      if (curDateIn.day == this.currentDate.day && curDateIn.month == this.currentDate.month) {
        curDateIn.isActive = true;
      }
      this.showDateArray.push(curDateIn);
    }
  }


  /**
    * 补齐前面的日历
    */
  setBeforeDay(fristDay: number) {
    let year = this.currentDate.month > 0 ? this.currentDate.year : this.currentDate.year - 1;
    let beforeMonth = this.currentDate.month > 0 ? this.currentDate.month - 1 : 11;
    let monthDay = this.getMonthDay(year, beforeMonth);
    // console.log('上个月的天数', monthDay);
    for (let day = monthDay - fristDay + 1; day <= monthDay; day++) {
      let newDay: any = this.formatDay(day);
      //初始化对象
      let curDateIn = this.initDateObj();
      curDateIn.year = year;
      curDateIn.month = beforeMonth;
      curDateIn.day = newDay;
      curDateIn.isBefore = true;
      if (curDateIn.day == this.currentDate.day && curDateIn.month == this.currentDate.month) {
        curDateIn.isActive = true;
      }
      this.showDateArray.push(curDateIn);
    }
  }




  /**
   * 
   */
  setAfterDay(lastDay: number) {
    for (let day = 1; day <= (6 - lastDay); day++) {
      let year = this.currentDate.month < 11 ? this.currentDate.year : this.currentDate.year + 1;
      let afterMonth = this.currentDate.month < 11 ? this.currentDate.month + 1 : 1;

      let newDay: any = this.formatDay(day);
      //初始化对象
      let curDateIn = this.initDateObj();
      curDateIn.year = year;
      curDateIn.month = afterMonth;
      curDateIn.day = newDay;
      curDateIn.isAfter = true;
      console.log('121212', this.currentDate.day);
      if (curDateIn.day == this.currentDate.day && curDateIn.month == this.currentDate.month) {
        curDateIn.isActive = true;
      }
      this.showDateArray.push(curDateIn);
    }
  }


  /**
   * 切换年份
   */
  switchYear(event: MouseEvent, year: any) {
    console.log('asasasas', year, this.currentDate.day);
    event.stopPropagation();
    this.currentDate.year = year;
    // this.dateInstance.setMonth(i, 1);
    this.dateInstance.setFullYear(year, this.currentDate.month, this.currentDate.day);
    this.initShowCalendar();
    this.isShowAllYear = false;
    // this.currentDate.dateStr = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    this.formatDateStr();
  }


  /**
   * 切换月份
   */
  switchMonth(event: MouseEvent, item: any, i: number) {
    event.stopPropagation();
    this.currentDate.month = i;
    this.dateInstance.setMonth(i, this.currentDate.day);
    this.initShowCalendar();
    this.isShowAllMonth = false;
    // this.currentDate.dateStr = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    this.formatDateStr();
  }


  /**
   * 选择日期
   */
  selectDate(data: any) {
    //
    this.currentDate.day = data.day;
    this.showDateArray.forEach((item: any) => {
      item.isActive = false;
    })
    if (data.isBefore) {
      this.goAfterOrPrveMonth(1);
    } else if (data.isAfter) {
      this.goAfterOrPrveMonth(2);
    }
    // console.log('sddsds', data);
    data.isActive = true;
    let month = this.formatDay(data.month + 1);
    // this.currentDate.dateStr = data.year + '-' + month + '-' + data.day;
    this.formatDateStr();
  }

  /**
  * 获取月份的天数
  */
  getMonthDay(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }


  formatDateStr() {
    this.currentDate.dateStr = this.currentDate.year + '-' + this.formatMonth(parseInt(this.currentDate.month)) + '-' + this.formatDay(parseInt(this.currentDate.day));
  }


  /**
   * 前后切换日历
   * @param type 
   */
  goAfterOrPrveMonth(type: number) {
    if (type == 1) {
      this.currentDate.year = this.currentDate.month > 0
        ? this.currentDate.year : parseInt(this.currentDate.year) - 1;
      this.currentDate.month = this.currentDate.month > 0
        ? parseInt(this.currentDate.month) - 1 : 11;
    } else if (type == 2) {
      this.currentDate.year = this.currentDate.month < 11
        ? this.currentDate.year : parseInt(this.currentDate.year) + 1;
      this.currentDate.month = this.currentDate.month < 11
        ? parseInt(this.currentDate.month) + 1 : 1;
      this.dateInstance.setFullYear(this.currentDate.year);
    }
    this.dateInstance.setFullYear(this.currentDate.year);
    this.dateInstance.setMonth(this.currentDate.month, 1);
    this.initShowCalendar();
  }




  /**
   * 初始化 每天的对象Obj
   */
  initDateObj() {
    return {
      year: '',
      month: 0,
      day: '',
      week: '',
      dateStr: '',
      isBefore: false,
      isAfter: false,
      isActive: false
    }
  }


  /**
   * 处理月
   */
  formatMonth(month: any) {
    month++;
    if (month < 10) {
      month = '0' + month;
    }
    return month;
  }

  /**
   *处理天
   */
  formatDay(day: any) {
    if (day < 10) {
      day = '0' + day;
    }
    return day;
  }


}
