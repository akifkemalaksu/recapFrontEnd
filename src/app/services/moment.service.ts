import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() { }

  getDayDiff(date1: moment.Moment, date2: moment.Moment) {
    return date1.diff(date2, 'days');
  }
}
