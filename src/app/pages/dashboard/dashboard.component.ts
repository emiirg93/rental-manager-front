import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Utils } from '../../core/helpers/utils';
import { UploadFileComponent } from '../../shared/components/upload-file/upload-file.component';
import { EmiiterUploadFile } from '../../shared/models/emitter-upload-file.model';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        UploadFileComponent,
        CurrencyPipe,
        MatCardModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public emitter!: EmiiterUploadFile ;
    date : Date = new Date();

    get monthName() {
        const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(this.date);
        // Capitalizar la primera letra y mantener el resto en minúsculas
        return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    }

    get alquier() : number {
        return Utils.val(this.emitter,'rentalValues.alquiler',0);
    }

    get abl() : number {
        return Utils.val(this.emitter,'rentalValues.abl.totalAbl',0);
    }

    get impuestoInmobiliario() : number {
        return Utils.val(this.emitter,'rentalValues.abl.impuestoInmobiliario',0);
    }

    get extraordinarias() : number {
        return Utils.val(this.emitter,'rentalValues.expensas.extraordinarias',0);
    }

    get expensas(): number {
        return Utils.val(this.emitter,'rentalValues.expensas.totalExpensas',0);
    }

    setEmitterUploadResponse($event : EmiiterUploadFile){
        this.emitter = $event;
    }
}
