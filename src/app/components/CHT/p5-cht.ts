import { Renderer } from "p5";
import { Theme } from "../../models/theme";
import { GuageServiceBase } from "../../services/GuageServiceBase";
import { GuageBase } from "../guage/guage-base";
import { GuageFactory } from "../guage/guage-factory";
import { CHTService } from "./cht.service";
import { LayoutInfo, PositionInfo } from "../guage/layout-info";

export class P5CHT extends GuageBase {
    private _currentCHT: number = 0;
    private _chtSvc: CHTService;

    constructor(pContainer: HTMLElement, pWidth: number,  pHeight: number,  pSvc: CHTService, pTheme: Theme) {
      super(() => {}, pContainer, pWidth, pHeight, pSvc as GuageServiceBase, pTheme);
      
      this._chtSvc = this._svc as CHTService      

      console.log(`creating CHT cmp with width:${pWidth} height:${pHeight}`);
    }
  
    override windowResized = () => {
      this.resizeCanvas(this._width, this._height, true);
      this.resizeLayout();
    }

    override setup = () => {
      super.setup();
        
      this.setLayoutPosition(0,4);

      this.fill(0);
    
      this.noStroke();
      this.textSize(24);
      this.textFont('Helvetica');
      this.textAlign(this.LEFT);

      this._chtSvc.cht$.subscribe(d => {
        this._currentCHT = d;
        this.draw();
      });
    }

    override draw = () => {
      this.background(255);
            
      let hr = this.hour();
      let mn = this.minute();
      let sc = this.second();
      this.drawBorder();
      this.drawTitle("CHT");
      this.stroke(this.color(this._theme.Face!.Color!));

      this.fill(this.color(this._theme.Face!.Color!));
      let textSize = this._height/2;
      this.textFont('Helvetica', textSize);
      this.textAlign(this.CENTER, this.CENTER);
      this.text(Math.floor(this._currentCHT), this._width/2, this._height/2);
      

      this.drawUnitType();

      if(this._chtSvc.prevTemp! > this._currentCHT) {
        this.drawTrendIndicatorDown();
      } else {
        this.drawTrendIndicatorUp();
      }
    }

    /* This is a test method for drawing a small circle in the middle of the current cell in the layout. Eg, if deminsion is 4x4 and position is 1,4,
       then dot is draw at the top right, i.e. first row fourth column.
    */
    private drawDot = () => {
      this.push();
      this.fill(this.color('#BF40BF'));
      this.circle(this._layout._centerPoint.x, this._layout._centerPoint.y, 25);
      this.pop();
    } 

    drawTrendIndicatorDown = () => {
      this.setLayoutPosition(1, 4);

      // need to calculate the triagle size based on dynamic cell size, not the hardcoded 20/40 values below
      this.fill("green");

      let height = this._layout._height * .45; // use about half the height of the current cell
      let width = this._layout._width * .3; // triangle slightly narrower than tall, but keep proportional to width of cell

      let p1x:number = this._layout._centerPoint.x
      let p1y:number = this._layout._centerPoint.y + (height/2);

      let p2x:number = this._layout._centerPoint.x - width/2;
      let p2y:number = this._layout._centerPoint.y - (height/2);

      let p3x:number = this._layout._centerPoint.x + width/2;
      let p3y:number = this._layout._centerPoint.y - (height/2);

      this.triangle(p1x, p1y, p2x, p2y, p3x, p3y);
    }

    
    drawTrendIndicatorUp = () => {
      this.setLayoutPosition(1, 4);

      // need to calculate the triagle size based on dynamic cell size, not the hardcoded 20/40 values below
      this.fill("red");

      let height = this._layout._height * .45;
      let width = this._layout._width * .3;

      let p1x:number = this._layout._centerPoint.x - width/2;
      let p1y:number = this._layout._centerPoint.y + (height/2);

      let p2x:number = this._layout._centerPoint.x;
      let p2y:number = this._layout._centerPoint.y - (height/2);

      let p3x:number = this._layout._centerPoint.x + width/2;
      let p3y:number = this._layout._centerPoint.y + (height/2);

      this.triangle(p1x, p1y, p2x, p2y, p3x, p3y);
    }

    drawUnitType = () => {
      let textSize = this._height/6;

      this.setLayoutPosition(4, 4);
      let cx:number = this._layout._centerPoint.x;
      let cy:number = this._layout._centerPoint.y;

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