import { Component } from '@angular/core';
import { GuageComponent } from "../../components/guage/guage.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [GuageComponent]
})
export class DashboardComponent {

}
