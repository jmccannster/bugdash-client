//import * as p5 from "p5";
//import { GameTimerService } from "../services/game-timer.service";

import p5 from "p5";
import { ClockService } from "./clock.service";
import { GuageBase } from "../guage/guage-base";
import { GuageServiceBase } from "../../services/GuageServiceBase";
import { Theme } from "../../models/theme";

export class P5Clock extends GuageBase {

    private _clockSvc: ClockService;
    private _currentDate: Date = new Date();
  
    constructor(pContainer: HTMLElement, pWidth: number,  pHeight: number,  pClockSvc: ClockService, pTheme: Theme) {
      super(() => {}, pContainer, pWidth, pHeight, pClockSvc as GuageServiceBase, pTheme);
      this._clockSvc = pClockSvc;

      console.log(`creating CLOCK cmp with width:${pWidth} height:${pHeight}`);
    }
  
    override windowResized = () => {
      this.resizeCanvas(this._width, this._height, true);
    }

    override setup = () => {
      //this.createCanvas(this.windowWidth, this.windowHeight);
      this.createCanvas(this._width, this._height);
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
  
      this.drawBorder();

      this.fill('palegreen');
      let textSize = this._height/6;
      this.textFont('Helvetica', textSize);

      this.textAlign(this.CENTER, this.CENTER);
      this.text(this._currentDate.toLocaleTimeString(), this._width/2, this._height/2);
      this.textAlign(this.CENTER, this.CENTER);
      
    }
  }