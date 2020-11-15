import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  getDateDisplay(date){

    if (typeof date === 'string') {
      date = new Date(date);
    }

    return '' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
  }
}
