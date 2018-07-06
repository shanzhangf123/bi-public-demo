import { Injectable } from '@angular/core';

declare var require: any

const dateFormat = require('dateformat/lib/dateformat');

// @see https://github.com/felixge/node-dateformat

@Injectable()
export class DateService {
  public defaultFormat: string = 'HH:MM ddS mmm yyyy';

  /**
   * 将日期转为指定格式
   * @param date
   * @param formatString
   * @returns string
   */
  format(date: any, formatString?: string): string {
    let format = this.defaultFormat;
    if (typeof formatString !== 'undefined') {
      format = formatString;
    }
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/');
    }
    return dateFormat(date, format, true);
  }

  /**
   * 将日期转为指定格式,非utc时间
   * @param date
   * @param formatString
   * @returns string
   */
  formatLocal(date: any, formatString?: string): string {
    // console.log(333333);
    let format = this.defaultFormat;

    if (typeof formatString !== 'undefined') {
      format = formatString;
    }
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/');
    }
    return dateFormat(date, format, false);
  }

  /**
   * 将日期转为指定格式，并且根据时区显示对应时间
   * @param date 必须是utc字符串
   * @param formatString
   * @returns {string}
   * TODO Date.toLocaleString()支持时区参数，但是Safari浏览器尚不支持
   */
  formatWithTimezone(date: any, formatString?: string): string {
    if (!date) {
      return '';
    }
    let newDate: any = this.getNewDate(date);

    let utcDate: any = new Date(newDate);

    if (Object.prototype.toString.call(utcDate) === "[object Date]") {
      // it is a date
      if (isNaN(utcDate.getTime())) {
        return date;
      } else {

        // is valid date
        // 对于+8时区, Offset会返回-480，单位为分钟
        // @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset]
        let utcTimeStamp = Date.parse(utcDate) - utcDate.getTimezoneOffset() * 60 * 1000;
        let timezoneDate = new Date(utcTimeStamp);
        // 年/月/日 时:分:秒
        //1493023650475
        //2017/4/25 0:47:30
        let timezoneDateStr =
          timezoneDate.getFullYear() + '/' + (timezoneDate.getMonth() + 1) + '/' + timezoneDate.getDate()
          + ' ' + timezoneDate.getHours() + ':' + timezoneDate.getMinutes() + ':' + timezoneDate.getSeconds();
        let format = this.defaultFormat;
        if (typeof formatString !== 'undefined') {
          format = formatString;
        }
        return dateFormat(timezoneDateStr, format);
      }
    }
    else {
      return date;
    }

  }


  /**
   * 获取new时间数据
   */
  getNewDate(date: any): any {
    let reg: any = /^\+?[1-9][0-9]*$/;
    let numReg = new RegExp(reg);

    if (numReg.test(date)) {
      date = date.length === 10 ? date + '000' : date;
      date = parseInt(date);
    } else {
      date = date.toString();
      // safari not support format 2016-01-01, should use 2016/01/01
      date = date.replace(/-/g, '/');
      let search = date.indexOf('GMT');
      if (search !== -1) {
        date = date.slice(0, search);
      }
    }
    return date;
  }

  /**
   * 获取当前日期, UTC标准
   * @param formatString
   * @returns string
   */
  nowDateFormat(formatString?: string): string {
    let now = new Date().toUTCString();
    let format = this.defaultFormat;
    if (typeof formatString !== 'undefined') {
      format = formatString;
    }
    if (typeof now == 'string') {
      now = now.replace(/-/g, '/');
    }
    return dateFormat(now, format, true);
  }

  /**
   * 将非UTC时间按照指定格式转为UTC时间格式字符串
   * @param time '2017-07-26 02:00:00' 非UTC时间
   * @param formatString
   */
  utcDateFormat(time: any, formatString?: string): string {
    if (typeof time == 'string') {
      time = time.replace(/-/g, '/');
    }
    let t = new Date(time).toUTCString();
    let format = this.defaultFormat;
    if (typeof formatString !== 'undefined') {
      format = formatString;
    }
    if (typeof t == 'string') {
      t = t.replace(/-/g, '/');
    }
    return dateFormat(t, format, true);
  }

  /**
   * 获取基于一个时间跨度的结束时间
   * 支持 天/周/月/年
   * 如 获取2017-01-09三周后的日期
   * 使用方法为 datePeriod('2017-01-09', 'week', 3)
   * @param start
   * @param period 'day'|'week'|'month'|'year'
   * @param formatString
   * @param num
   * @param timezone 显示UTC或者非UTC格式
   * @return any
   */
  public datePeriod(start: any, period: string, num?: number, formatString?: string, timezone?: boolean): string {
    let numPeriod = (typeof num === 'undefined') ? 1 : num;
    let t = (typeof timezone !== 'undefined');
    let format = this.defaultFormat;
    if (typeof formatString !== 'undefined') {
      format = formatString;
    }
    let newDate = this.calculatePeriod(start, period, numPeriod);
    return t ? this.formatWithTimezone(newDate, format) : this.format(newDate.toUTCString(), format);
  }

  /**
   * 计算时间
   * @param start 非utc
   * @param period
   * @param numPeriod
   * @returns {Date}
   */
  public calculatePeriod(start: any, period: string, numPeriod: number): Date {
    let date = new Date(start);
    let newDate = new Date(start);
    switch (period) {
      case 'hour':
        newDate = new Date(date.getTime() + 60 * 60 * 1000 * numPeriod);
        break;
      case 'week':
        let timePeriod = 7 * 24 * 60 * 60 * 1000 * numPeriod;
        newDate = new Date(date.getTime() + timePeriod);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + numPeriod);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + numPeriod);
        break;
      case 'day':
      default:
        newDate.setDate(newDate.getDate() + numPeriod);
    }
    return newDate;
  }


  /**
   * 将日历框选到的时间拼成 yyyy-mm-dd HH:MM:ss 格式 ==> 并转为utc时间
   */
  public formatCalendarData(date: any) {
    let formatDateForm: string = 'yyyy-mm-dd HH:MM:ss';
    for (let key in date) {
      if (date[key].year !== '') {
        date[key].formatDateString = date[key].year + '-' + (date[key].month + 1) + '-' + date[key].monthDay + ' ' + date[key].hour + ':' + date[key].minute + ':00';
        date[key].formatDateString.replace(/-/g, '/');
        date[key].formatUtcString = this.utcDateFormat(date[key].formatDateString.replace(/-/g, '/'), formatDateForm)
        date[key].formatUtcString.replace(/-/g, '/');
      }
    }
  }

  /**
   * UTC 时间转换成本地时间
   * @param time
   * @param isUTC
   * @param formatString
   * {时间戳(time)：1496735196, 是否转成utc时间(isUTC): true | false}
   */
  formatLocalDate(time: any, isUTC: boolean, formatString: string) {
    let timeOffset: number = this.getTimeZoneOffset();
    let getTime: number;
    let localDate: any = this.localDateTime();
    getTime = time ? time : localDate;
    let timezoneDate = new Date(getTime * 1000 - timeOffset);
    let timezoneDateStr =
      timezoneDate.getFullYear() + '/' + (timezoneDate.getMonth() + 1) + '/' + timezoneDate.getDate()
      + ' ' + timezoneDate.getHours() + ':' + timezoneDate.getMinutes() + ':' + timezoneDate.getSeconds();
    let format = this.defaultFormat;
    if (typeof formatString !== 'undefined') {
      format = formatString;
    }
    return dateFormat(timezoneDateStr, format);
  }

  /**
   * 时区差 返回的是秒数
   * @returns {number}
   */
  getTimeZoneOffset(): number {
    return new Date().getTimezoneOffset() * 60 * 1000;
  }

  /**
   * 本地时间戳
   */
  localDateTime(): number {
    let date: any = new Date().getTime() / 1000;
    return parseInt(date);
  }

  /**
   * 获取时间戳
   * @param {string} date
   * @returns {number}
   */
  getTimeStamp(date: string): number {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/');
    }
    return new Date(date).getTime();
  }

}
