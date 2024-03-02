import { GuageServiceBase } from "../../services/GuageServiceBase";
import { GuageBase } from "../guage/guage-base";
import { GuageFactory } from "../guage/guage-factory";
import { CHTService } from "./cht.service";

export class P5CHT extends GuageBase {
    private _currentCHT: number = 0;
    private _chtSvc: CHTService;
  
    constructor(pContainer: HTMLElement, pWidth: number,  pHeight: number,  pSvc: CHTService) {
      super(() => {}, pContainer, pWidth, pHeight, pSvc as GuageServiceBase);
      
      this._chtSvc = this._svc as CHTService      

      console.log(`creating CHT cmp with width:${pWidth} height:${pHeight}`);
    }
  
    override windowResized = () => {
      this.resizeCanvas(this._width, this._height, true);
    }

    override setup = () => {
      
      //this.createCanvas(this.windowWidth, this.windowHeight);
      this.createCanvas(this._width, this._height, );
      //this.angleMode(this.DEGREES);
        
      
      this.fill(0);
    
      this.noStroke();
      this.textSize(24);
      this.textFont('Helvetica');
      this.textAlign(this.LEFT);

      this._chtSvc.cht$.subscribe(d => {
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
      this.drawBorder();
      this.stroke(255);

      this.fill('palegreen');
      let textSize = this._height/2;
      this.textFont('Helvetica', textSize);
      this.textAlign(this.CENTER, this.CENTER);
      this.text(Math.floor(this._currentCHT), this._width/2, this._height/2);
      

      this.drawUnitType();

     // 

    }

    drawUnitType = () => {
      // calculate lower right quadrant
      let x:number = (this._width/2)/2;
      let y:number = (this._height/2)/2;
      let cx:number = this._width - (x/2);
      let cy:number = this._height - (y/2);

      let textSize = this._height/6;

      this.fill(255);
      this.circle(cx-(textSize/2.25),  cy-(textSize/2.25), 15);
      this.fill("black");
      this.circle(cx-(textSize/2.25),  cy-(textSize/2.25), 10);
      this.fill(255);
      this.textFont('Helvetica', textSize);
      this.text('F', cx, cy);
      this.textAlign(this.CENTER, this.TOP);
    }
  }