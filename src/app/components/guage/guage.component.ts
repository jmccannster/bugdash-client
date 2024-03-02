import { Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import { ClockService } from '../Clock/clock.service';
import { P5Clock } from '../Clock/P5Clock';
import { GuageFactory } from './guage-factory';
import { ResizeService } from '../../services/resize.service';
import { IGuage } from './iguage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guage',
  standalone: true,
  imports: [],
  templateUrl: './guage.component.html',
  styleUrl: './guage.component.scss'
})
export class GuageComponent {
  @ViewChild('gauge', {static: true}) public gauge: ElementRef | any;
  @Input({ required: true }) guageName!: string;

  private _guage?:IGuage;
  private _resizeSub?:Subscription;
  private _percentOfWidth: number = 0;
  private _percentOfHeight: number = 0;

  constructor(
    private clockSvc: ClockService, 
    private injector:Injector,
    private resizeSvc: ResizeService) {}

  ngOnInit(): void {
    this.clockSvc.Start();

    

  }

  ngAfterViewInit() {

    this._resizeSub = this.resizeSvc.rez$.subscribe(rez => {

      // first time. Let's calculate our share of the realestate
      if(this._percentOfWidth === 0) {
        this._percentOfWidth = this.gauge.nativeElement.offsetParent.clientWidth / rez.width;
        this._percentOfHeight = this.gauge.nativeElement.offsetParent.clientHeight / rez.height;
      }

      if(this.gauge) {
        let parentWidth = this.gauge.nativeElement.offsetParent.clientWidth;
        let tmp = rez.width * this._percentOfWidth;
        this._guage!.Width = tmp;
        this._guage!.Height = rez.height * this._percentOfHeight;
        console.log(`new window width: ${rez.width} new guage widthx: ${tmp}`);
      }
    });

    let parentHeight = this.gauge.nativeElement.offsetParent.clientHeight;
    let parentWidth = this.gauge.nativeElement.offsetParent.clientWidth;
    //let clock = new P5Clock(this.gauge.nativeElement, parentHeight, parentWidth, this.clockSvc);

    let factory:GuageFactory = new GuageFactory(this.injector);
    console.log(`GuageComponent width:${parentWidth} height:${parentHeight}`);
    this._guage = factory.createGuage(this.guageName, this.gauge.nativeElement, parentWidth, parentHeight)!;
  }

  ngOnDestroy() {
    this.clockSvc.Stop();

    //TODO - don't we need to stop the P5 instance???
  }
}
