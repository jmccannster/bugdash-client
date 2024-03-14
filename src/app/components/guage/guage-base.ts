import p5, { Renderer } from "p5";
import { IGuage } from "./iguage";
import { GuageServiceBase } from "../../services/GuageServiceBase";
import { Theme } from "../../models/theme";
import { LayoutInfo, PositionInfo } from "./layout-info";

export class GuageBase extends p5 implements IGuage {

    protected _height: number;
    protected _width: number;
    protected _svc: GuageServiceBase;
    protected _container: HTMLElement;
    protected _theme: Theme;
    protected _renderer?: Renderer;
    protected _layout!: LayoutInfo;

    constructor( pObj: any, pContainer: HTMLElement, pWidth: number,  pHeight: number, pSvc: GuageServiceBase, pTheme: Theme) {
        super(pObj, pContainer);

        this._container = pContainer;
        this._height = pHeight;
        this._width = pWidth;
        this._svc = pSvc;
        this._theme = pTheme;       
        this._layout = new LayoutInfo(this._width, this._height, 4, 4);
    }    

    public get Height() {
        return this._height;
    }

    public get Width() {
        return this._width;
    }

    public set Height(value:number) {
        this._height = value;
    }

    public set Width(value:number) {
        this._width = value;
    }

    public override setup() {
        this._renderer = this.createCanvas(this._width, this._height, );
    }

    protected resizeLayout() {
        this._layout.LayoutHeight = this._height;
        this._layout.LayoutWidth = this._width;
        this._layout.Recalculate();
    }

    protected setLayoutDemension(pNumOfRows:number, pNumOfColumns:number) {
        this._layout.Rows = pNumOfRows;
        this._layout.Columns = pNumOfColumns;
    }

    protected setLayoutPosition(pRow:number, pCol:number) {
        this._layout.Position = new PositionInfo(pRow, pCol);
    }

    protected drawBorder() {

        this.background(this.color(this._theme.BgColor!))
        let pad:number = this._height * .025;

        // let's try a square with a fill and stroked radiased border :)
        this.push();
        this.stroke(this._theme.Face!.Color!);
        this.strokeWeight(this._theme.Face!.BorderWidth!);
        this.fill(this._theme.Face!.BGColor!);
        this.rect(pad,pad,this._width -pad*2,this.height-pad*2,this._theme.Face!.BorderRadius);
        this.pop();
    }

    protected drawTitle(pTitle: string) {

        let pad:number = this._height * .025;

        let boxBorderWidth:number = this._theme.Face!.BorderWidth! /2;

        // define the actual quadrant
        let qx = pad + this._theme.Face!.BorderWidth!;
        let qy = pad + this._theme.Face!.BorderWidth!;
        let qw = this._width - (pad*2) - (this._theme.Face!.BorderWidth! * 2);
        let qh = (this.height - (pad*2) - (this._theme.Face!.BorderWidth! * 2)) /4;

        let qcX = qw/2 + (pad + this._theme.Face!.BorderWidth!); // move the x in past the cell padding and border width
        let qcY = qh/2 + (pad + this._theme.Face!.BorderWidth!); // move the x down past the cell padding and border width

        let txtH = qh - (pad*4) - (boxBorderWidth*2) // we want padding then border, then padding (top and bottom) around the text, So, 4 paddings and 2 borders total
        
        this.textFont('Helvetica', txtH);
        this.textAlign(this.CENTER, this.TOP);
        let txtW = this.textWidth(pTitle);

        // now, since the text is drawn from the CENTER,CENTER. We must calculate the true
        // border x,y
        let bX = qcX - (txtW/2);
        let bY = qcY - (txtH/2);

        // DRAW A BOX AROUND THE TEXT
        let bx:number = qcX - txtW/2 - pad;
        let by:number = qcY - txtH/2 - pad;
        let bw:number = txtW + (pad*2);
        let bh:number = txtH + (pad*2) - boxBorderWidth;
        this.push();
        this.stroke(this._theme.Title!.Color!);
        this.strokeWeight(boxBorderWidth);
        this.fill(this._theme.Title!.BGColor!);
        this.rect(bx,by,bw, bh, this._theme.Title!.BorderRadius);
        this.pop();

        // DRAW THE TEXT!
        this.push();
        this.noStroke();
        this.fill(this._theme.Title!.Color!);     
        this.textAlign(this.CENTER, this.CENTER);
        this.text(pTitle, qcX, qcY);
        this.pop();




        /*
        let titleW: number;
        let titleH: number;
        
        let textSize:number = (this._height * (this._theme.Title!.FontSize! / 100));
        this.textFont('Helvetica', textSize);
        this.textAlign(this.CENTER, this.TOP);
        titleW = this.textWidth(pTitle);
        titleH = textSize;

        // make the padding a percentage of the font size.
        

        let faceX:number = pad;
        let faceY:number = pad;

        let faceCx:number = this._width/2;
        let titleWidth: number = this._width * .5;
        let titleX = faceCx - (titleWidth/2);
        let titleHeight = (this._height * (this._theme.Title!.FontSize! / 100));

        this.push();
        this.stroke(this._theme.Face!.Color!);
        this.strokeWeight(this._theme.Title!.BorderWidth!);
        this.fill(this._theme.Title!.BGColor!);
        //this.rect(titleX,faceY+(pad*2),titleWidth,titleHeight, this._theme.Title!.BorderRadius);
       
        
        let fontX:number = this._width/2;
        let fontY:number = (titleHeight /2) + pad/2;

        // calculate the x,y of the rectangle around the text. The text is drawn from the center of the next.
        let rX:number = (this._width/2) - (titleW/2);
        let rY:number = (fontY + (fontY - (textSize)));

        this.rect(rX,rY,titleW,titleH, this._theme.Title!.BorderRadius);

        //let textSize:number = (this._height * (this._theme.Title!.FontSize! / 100));
        this.noStroke();
        this.fill(this._theme.Title!.Color!);
        this.textFont('Helvetica', textSize);
        this.textAlign(this.CENTER, this.TOP);
        this.text(pTitle, fontX, fontY);
       
        this.pop();
        */
    }
}
