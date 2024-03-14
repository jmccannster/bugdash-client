export class PointInfo {
    public x:number = 0;
    public y:number = 0;
}

export class PositionInfo {
    public Row:number = 1;
    public Col:number = 1;

    constructor(pRow: number, pCol:number) {
        this.Row = pRow;
        this.Col = pCol;
    }
}

export class LayoutInfo{
    protected _rows:number = 1;
    public _columns: number = 1;
    public _position!: PositionInfo;

    public _orginPoint!: PointInfo;
    public _centerPoint!: PointInfo;
    public _width!: number;
    public _height!: number;

    public _layoutWidth!: number;
    public _layoutHeight!: number;

    public _history:Array<string>;

    public get LayoutWidth() {
        return this._layoutWidth;
    }

    public set LayoutWidth(value:number) {
       this._layoutWidth = value;
    }

    public get LayoutHeight() {
        return this._layoutHeight;
    }

    public set LayoutHeight(value:number) {
       this._layoutHeight = value;
    }

    public get Rows() {
        return this._rows;
    }

    public set Rows(value:number) {
       this._rows = value;
    }

    public get Columns() {
        return this._columns;
    }

    public set Columns(value:number) {
       this._columns = value;
       //this.recalculate();
    }

    public get Position() {
        return this._position;
    }

    public set Position(value:PositionInfo) {
       this._position = value;
       this.Recalculate();
    }

    constructor(pWidth:number, pHeight:number, pNumOfRows:number, pNumOfColumns:number) {
        this._layoutWidth = pWidth;
        this._layoutHeight = pHeight;
        this.Position = new PositionInfo(1,1);
        this.Columns = pNumOfColumns;
        this.Rows = pNumOfRows;

        this._history = new Array<string>();
    }

    public Recalculate() {
        let orgin:PointInfo = new PointInfo();
        let center:PointInfo = new PointInfo();

        this._width = this._layoutWidth / this.Columns; // this is the current width of a cell
        this._height = this._layoutHeight / this.Rows; // current height of a cell

        // find x of the current position
        orgin.x = (this._width) * (this.Position.Col-1);
        orgin.y = (this._height) * (this.Position.Row -1);

        center.x = orgin.x + (this._width/2);
        center.y = orgin.y + (this._height/2);

        this._orginPoint = orgin;
        this._centerPoint = center;
    }

    public Push() {
        this._history.push(JSON.stringify(this));
    }

    public Pop() {
        let tmp:LayoutInfo = JSON.parse(this._history.pop()!) as LayoutInfo;
        this._position = tmp._position;
        this._layoutWidth = tmp._layoutWidth
        this._layoutHeight = tmp._layoutHeight;
        this._width = tmp._width;
        this._height = tmp._height;
        this.Columns = tmp._columns;
        this.Rows = tmp._rows;
        this.Recalculate();
    }
}
