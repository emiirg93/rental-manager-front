import { Component, inject } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
    selector: 'app-spinner',
    imports: [],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
    standalone:true
})
export class SpinnerComponent {
    spinnerSvc = inject(SpinnerService);
}
