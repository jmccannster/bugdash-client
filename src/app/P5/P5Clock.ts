//import * as p5 from "p5";
//import { GameTimerService } from "../services/game-timer.service";

import p5 from "p5";
import { ClockService } from "../services/clock.service";
import { GuageBase } from "../components/guage/guage-base";

export class P5Clock extends GuageBase {

    private _height: number;
    private _width: number;
    //private gameTime: number;
    private _clockSvc: ClockService;
    private _currentDate: Date = new Date();
  
    constructor(pContainer: HTMLElement, pHeight: number, pWidth: number, pClockSvc: ClockService) {
      super(() => {}, pContainer);
      this._clockSvc = pClockSvc;
      this._height = pHeight;
      this._width = pWidth;
    }
  
    override setup = () => {
      //this.createCanvas(this.windowWidth, this.windowHeight);
      this.createCanvas(this._height, this._width);
      //this.angleMode(this.DEGREES);
  
      this.noStroke();
      this.fill(0);
      this.textSize(24);
      this.textFont('Helvetica');
      this.textAlign(this.LEFT);

      this._clockSvc.clockTime$.subscribe(d => {
        //console.log(d.getTime());
        this._currentDate = d;
        this.draw();
      });

      //console.log(`height: ${this._height} width: ${this.width}`);
    }
  
    override draw = () => {
      this.background(255);
  
      //this.rotate(-90);
      //this.stroke(255, 100, 150);
            
      let hr = this.hour();
      let mn = this.minute();
      let sc = this.second();
  
      this.text(this._currentDate.toLocaleTimeString(), this._height/2, this._width/2);
      this.textAlign(this.CENTER);

    }
  }