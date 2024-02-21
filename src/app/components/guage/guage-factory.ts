import { Injector } from "@angular/core";
import { P5Clock } from "../../P5/P5Clock";
import { ClockService } from "../../services/clock.service";
import { IGuage } from "./iguage";

export class GuageFactory {

    constructor(
        private injector:Injector
    ) {}

    public createGuage(pName: string, pCanvasElement: any, width:number, height:number): IGuage | null {

        let guage:IGuage | null = null;

        switch(pName.toLowerCase())
        {
            case "clock":
                let svc:ClockService = this.injector.get(ClockService);
                guage = new P5Clock(pCanvasElement, height, width, svc);
                break;
            default:
                console.log(`Unable to create unsupported guague ${pName}. Did you misspell it?`);
                // todo: do we need to route to an error page
                break;
        }
       
        return guage;
    }
}
