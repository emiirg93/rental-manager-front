import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@Component({
    selector: 'app-root',
    imports: [RouterModule, SpinnerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'rental-manager-front';
}
