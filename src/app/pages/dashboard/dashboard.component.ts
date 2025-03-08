import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Utils } from '../../core/helpers/utils';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { UploadFileComponent } from '../../shared/components/upload-file/upload-file.component';
import { EmitterUploadFile } from '../../shared/models/emitter-upload-file.model';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        UploadFileComponent,
        MatCardModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule,
        StepperComponent,
        StepperComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public emitter!: EmitterUploadFile;
    date : Date = new Date();

    get monthName() {
        const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(this.date);
        // Capitalizar la primera letra y mantener el resto en minúsculas
        return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    }

    get year() {
        return this.date.getFullYear();
    }

    get alquier() : string {
        return Utils.formatToARS(Utils.val(this.emitter,'rentalValues.alquiler',0));
    }

    get abl() : string {
        return Utils.formatToARS(Utils.val(this.emitter,'rentalValues.abl.totalAbl',0));
    }

    get impuestoInmobiliario() : string {
        return Utils.formatToARS(Utils.val(this.emitter,'rentalValues.abl.impuestoInmobiliario',0));
    }

    get extraordinarias() : string {
        return Utils.formatToARS(Utils.val(this.emitter,'rentalValues.expensas.extraordinarias',0));
    }

    get expensas(): string {
        return Utils.formatToARS(Utils.val(this.emitter,'rentalValues.expensas.totalExpensas',0));
    }

    get stepIndex() : number {
        return this.emitter?.stepIndex ?? 0;
    }

    get valorAlquiler(): string {
        return Utils.formatToARS(317000);
    }

    setEmitterUploadResponse($event : EmitterUploadFile){
        this.emitter = {... this.emitter, ...$event};
    }
}
