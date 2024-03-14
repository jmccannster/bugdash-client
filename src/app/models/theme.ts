export class Theme {
    Name:string;
    Style: string;
    BgColor:string | undefined;    
    Face: InfoType | undefined;
    Title: InfoType | undefined;
    Label: InfoType | undefined;
    Info: InfoType | undefined;
    Warning: InfoType | undefined;
    Error: InfoType | undefined;

    constructor() {
        this.Name = "Default";
        this.Style = "Digital";
        this.BgColor = "#191D1E"; // dark gray

        this.Face = new InfoType();
        this.Face.BGColor = "#242829";
        this.Face.Color = "#E9B125";
        this.Face.BorderRadius = 5;
        this.Face.BorderStyle = "solid";
        this.Face.BorderWidth = 10;
        this.Face.FontFamily = "Helvetica";
        this.Face.FontStyle = "solid";
        this.Face.FontWeight = 400;
        this.Face.FontSize = 50;

        // every guage needs a title
        this.Title = new InfoType();
        this.Title.BGColor = "#242829";
        this.Title.Color = "#FFF";
        this.Title.BorderRadius = 5;
        this.Title.BorderStyle = "solid";
        this.Title.BorderWidth = 10;
        this.Title.FontFamily = "Helvetica";
        this.Title.FontStyle = "solid";
        this.Title.FontWeight = 400;
        this.Title.FontSize = 10;

        // primary information display, such as the temperature in CHT
        this.Info = new InfoType();
        this.Info.BGColor = "#242829";
        this.Info.Color = "#E9B125";
        this.Info.BorderRadius = 5;
        this.Info.BorderStyle = "solid";
        this.Info.BorderWidth = 10;
        this.Info.FontFamily = "Helvetica";
        this.Info.FontStyle = "solid";
        this.Info.FontWeight = 400;
        this.Info.FontSize = 50;

        // example the F in the CHT guage
        this.Label = new InfoType();
        this.Label.BGColor = "#242829";
        this.Label.Color = "#191D1E";
        this.Label.BorderRadius = 5;
        this.Label.BorderStyle = "solid";
        this.Label.BorderWidth = 10;
        this.Label.FontFamily = "Helvetica";
        this.Label.FontStyle = "solid";
        this.Label.FontWeight = 400;
        this.Label.FontSize = 16.67;

        this.Warning = new InfoType();
        this.Warning.BGColor = "#E98025";
        this.Warning.Color = "#E98025";
        this.Warning.BorderRadius = 5;
        this.Warning.BorderStyle = "solid";
        this.Warning.BorderWidth = 10;
        this.Warning.FontFamily = "Helvetica";
        this.Warning.FontStyle = "solid";
        this.Warning.FontWeight = 400;
        this.Warning.FontSize = 16.67;

        this.Error = new InfoType();
        this.Error.BGColor = "#E92A25";
        this.Error.Color = "#E92A25";
        this.Error.BorderRadius = 5;
        this.Error.BorderStyle = "solid";
        this.Error.BorderWidth = 10;
        this.Error.FontFamily = "Helvetica";
        this.Error.FontStyle = "solid";
        this.Error.FontWeight = 400;
        this.Error.FontSize = 16.67;
    }
} 

export class InfoType {
    public Color:string | undefined;
    public FontFamily: string | undefined;
    public FontStyle: string | undefined;
    public FontWeight: number | undefined;
    public FontSize: number | undefined;
    public BGColor: string | undefined;
    public BorderStyle : string | undefined;
    public BorderWidth: number | undefined;
    public BorderRadius: number | undefined;
}
