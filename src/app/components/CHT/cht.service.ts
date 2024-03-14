import { Injectable } from '@angular/core';
import { GuageServiceBase } from '../../services/GuageServiceBase';
import { BehaviorSubject, Observable, interval, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CHTService extends GuageServiceBase {

  private _cht: BehaviorSubject<number> = new BehaviorSubject(0);
  public cht$: Observable<number> = this._cht.asObservable();
 // private minutes:Observable<number> = interval(60 * 1000); // one minute timer
  public prevTemp?:number;

  constructor() { 
    super();

    // grab the value every minute
    /*this.minutes.subscribe(x => {
      this.cht$.pipe(take(1)).subscribe(x => {
        this.prevTemp = x;
      });      
    } );*/
  }

  update(pCHT:number):void { 
    this.prevTemp = this._cht.getValue();
    this._cht.next(pCHT);
  }
}
