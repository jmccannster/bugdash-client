import { GuageBase } from "../guage/guage-base";
import { CHTService } from "./cht.service";

export class P5CHT extends GuageBase {
    private _height: number;
    private _width: number;
    //private gameTime: number;
    private _svc: CHTService;
    private _currentCHT: number = 0;
  
    constructor(pContainer: HTMLElement, pHeight: number, pWidth: number, pSvc: CHTService) {
      super(() => {}, pContainer);
      this._svc = pSvc;
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

      this._svc.cht$.subscribe(d => {
        //console.log(d.getTime());
        this._currentCHT = d;
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
  
      this.text(this._currentCHT, this._height/2, this._width/2);
      this.textAlign(this.CENTER);

    }
  }