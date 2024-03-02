import p5 from "p5";
import { IGuage } from "./iguage";
import { GuageServiceBase } from "../../services/GuageServiceBase";

export class GuageBase extends p5 implements IGuage {

    protected _height: number;
    protected _width: number;
    protected _svc: GuageServiceBase;
    protected _container: HTMLElement;

    constructor( pObj: any, pContainer: HTMLElement, pWidth: number,  pHeight: number, pSvc: GuageServiceBase) {
        super(pObj, pContainer);

        this._container = pContainer;
        this._height = pHeight;
        this._width = pWidth;
        this._svc = pSvc        
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

    protected drawBorder() {

        this.background("black")
    
        this.stroke("yellow");        
        // The point of origin is top left corder, 0,0
        let pad:number = 5
        // top
        this.line(pad, pad, this._width - pad, pad );
        // right
        this.line(this._width - pad, pad, this._width - pad, this.height - pad );
        //bottom
        this.line(pad, this.height - pad, this._width - pad, this.height - pad );
        // left
        this.line(pad, pad, pad, this.height - pad );
    }
}
