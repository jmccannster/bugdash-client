import { Injector } from "@angular/core";
import { P5Clock } from "../Clock/P5Clock";
import { ClockService } from "../Clock/clock.service";
import { IGuage } from "./iguage";
import { CHTService } from "../CHT/cht.service";
import { GuageServiceBase } from "../../services/GuageServiceBase";
import { P5CHT } from "../CHT/p5-cht";
import { Theme } from "../../models/theme";

export class GuageFactory {

    constructor(
        private injector:Injector
    ) {}

    public createGuage(pName: string, pCanvasElement: any, width:number, height:number, theme: Theme): IGuage | null {

        let guage:IGuage | null = null;
        let svc:GuageServiceBase | null = null;

        switch(pName.toLowerCase())
        {
            case "clock":
                svc = this.injector.get(ClockService) as ClockService;
                //guage = new P5Clock(pCanvasElement, width, height-250, svc as ClockService);
                guage = new P5Clock(pCanvasElement, width, height, svc as ClockService, theme);
                break;
            case "cht":
                svc = this.injector.get(CHTService);
                //guage = new P5CHT(pCanvasElement, width, height-250, svc as CHTService);
                guage = new P5CHT(pCanvasElement, width, height, svc as CHTService, theme);
                break;
            default:
                console.log(`Unable to create unsupported guague ${pName}. Did you misspell it?`);
                // todo: do we need to route to an error page
                break;
        }
       
        return guage;
    }
}
