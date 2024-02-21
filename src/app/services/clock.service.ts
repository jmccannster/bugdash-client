import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GuageServiceBase } from './GuageServiceBase';

@Injectable({
  providedIn: 'root'
})
export class ClockService extends GuageServiceBase {

  private _clockTime: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  clockTime$: Observable<Date> = this._clockTime.asObservable();

  private myTimer: number|null = null;
  
  constructor() { 
    super();    
  }

  updateTime():void {
    this._clockTime.next(new Date);
  }

  Start():void {
    console.log('start clock');
    setInterval(this.updateTime.bind(this), 1000);
  }

  Stop():void {
    console.log('stop clock');
    if(this.myTimer !== null) {
      clearInterval(this.myTimer);
    }
  }
}
