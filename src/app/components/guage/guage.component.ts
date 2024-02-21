import { Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { P5Clock } from '../../P5/P5Clock';
import { GuageFactory } from './guage-factory';

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

  constructor(
    private clockSvc: ClockService, 
    private injector:Injector) {}

  ngOnInit(): void {
    this.clockSvc.Start();
  }

  ngAfterViewInit() {
    let parentHeight = this.gauge.nativeElement.offsetParent.clientHeight;
    let parentWidth = this.gauge.nativeElement.offsetParent.clientWidth;
    //let clock = new P5Clock(this.gauge.nativeElement, parentHeight, parentWidth, this.clockSvc);

    let factory:GuageFactory = new GuageFactory(this.injector);
    let clock = factory.createGuage(this.guageName, this.gauge.nativeElement, parentWidth, parentHeight);
  }

  ngOnDestroy() {
    this.clockSvc.Stop();

    //TODO - don't we need to stop the P5 instance???
  }
}
