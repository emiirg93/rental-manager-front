import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EmiiterUploadFile } from '../../models/emitter-upload-file.model';
import { UploadFileService } from './upload-file.service';

@Component({
    selector: 'app-upload-file',
    imports: [MatButtonModule],
    templateUrl: './upload-file.component.html',
    styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

  @Input() allowMultiple = true; // Permitir selección múltiple
  @Input() acceptedTypes = 'application/pdf,image/jpeg,image/png'; // Tipos aceptados (e.g., "image/*,.pdf")
  @Output() res = new EventEmitter<EmiiterUploadFile>();

  uploadFileSvc = inject(UploadFileService);

  uploadInProgress = false;
  uploadProgress = 0;
  selectedFiles: File[] = [];

  get validFormats(){
      return this.acceptedTypes.split(',');
  }

  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files) {
          this.validateFiles(Array.from(input.files));
          this.uploadFiles();
      }
  }

  validateFiles(files:File[]){
      this.selectedFiles = files.filter(file =>
          this.validFormats.includes(file.type)
      );
      if (this.selectedFiles.length !== files.length) {
          console.warn('Algunos archivos no son válidos y fueron descartados.');
      }
  }

  // Simulación de subida (puedes reemplazar con lógica de tu servicio)
  uploadFiles(): void {
      if (this.selectedFiles.length > 0) {
          // Todo Invocar al servicio.
          const formData = new FormData();
          // Agregar los archivos al FormData
          this.selectedFiles.forEach(file => {
              formData.append('files', file); // 'files' debe coincidir con el nombre esperado en el backend
          });
          this.uploadFileSvc.upload(formData).subscribe(res => {
              this.res.emit({ rentalValues: res.response, formData });
          });
      }
  }
}
