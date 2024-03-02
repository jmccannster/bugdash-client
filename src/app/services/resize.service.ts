import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  rez$: Observable<Resolution>;    

  constructor() {
      const windowSize$ = new BehaviorSubject(getWindowSize());

      this.rez$ = windowSize$.pipe(distinctUntilChanged<Resolution>());        

      fromEvent(window, 'resize').pipe(map(getWindowSize))
          .subscribe(windowSize$);
  }

}

function getWindowSize() {
  return new Resolution(window.innerHeight, window.innerWidth);    
};

export class Resolution {
public height: number;
public width: number;

constructor(pH:number, pW: number) {
  this.height = pH;
  this.width = pW;
}
}