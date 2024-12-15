import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UploadFileComponent } from '../../shared/components/upload-file/upload-file.component';

@Component({
    selector: 'app-dashboard',
    imports: [UploadFileComponent,CurrencyPipe],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public res!: any;
    date : Date = new Date();

    get monthName() {
        const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(this.date);
        // Capitalizar la primera letra y mantener el resto en minúsculas
        return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    }
}
