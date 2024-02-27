import { Injectable } from '@angular/core';
import { GuageServiceBase } from '../../services/GuageServiceBase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CHTService extends GuageServiceBase {

  private _cht: BehaviorSubject<number> = new BehaviorSubject(0);
  public cht$: Observable<number> = this._cht.asObservable();

  constructor() { 
    super();
  }

  update(pCHT:number):void {
    this._cht.next(pCHT);
  }
}
