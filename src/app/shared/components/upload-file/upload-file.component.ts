import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import type { EmitterUploadFile } from '../../models/emitter-upload-file.model';

import { environment } from '../../../../environments/environment';
import { RentalValues } from '../../models/rental-values.model';

import { FilePreviewDialogComponent } from '../file-preview-dialog/file-preview-dialog.component';
import { TextInputDialogComponent } from '../text-input-dialog/text-input-dialog.component';
import { UploadFileService } from './upload-file.service';

interface FilePreview {
  name: string
  size: number
  type: 'image' | 'pdf' | 'other'
  url: string
  file: File
  uploaded: boolean
}

@Component({
    selector: 'app-upload-file',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatDialogModule,
        CommonModule
    ],
    templateUrl: './upload-file.component.html',
    styleUrl: './upload-file.component.scss',
    standalone: true,
})
export class UploadFileComponent {
  @Input() allowMultiple = true;
  @Input() acceptedTypes = 'application/pdf,image/jpeg,image/png';
  @Input() date!: {monthName:string, year:number};
  @Output() res = new EventEmitter<EmitterUploadFile>();

  uploadFileSvc = inject(UploadFileService);
  dialog = inject(MatDialog);

  uploadInProgress = false;
  uploadProgress = 0;
  filePreviews: FilePreview[] = [];
  iconUpload  = {
      icon: 'cloud_upload',
      description:'Confirmar subida'
  };
  rentalValues!:RentalValues;
  endOfTheExperience = false;

  get validFormats() {
      return this.acceptedTypes.split(',');
  }

  get pendingFiles() {
      return this.filePreviews.filter((file) => !file.uploaded);
  }

  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files) {
          const newFiles = Array.from(input.files);
          this.validateAndAddFiles(newFiles);
      }
  }

  validateAndAddFiles(files: File[]) {
      const validFiles = files.filter((file) => this.validFormats.includes(file.type));
      if (validFiles.length !== files.length) {
          console.warn('Algunos archivos no son válidos y fueron descartados.');
      }
      this.addFilePreviews(validFiles);
  }

  addFilePreviews(files: File[]): void {
      const newPreviews = files.map((file) => ({
          name: file.name,
          size: file.size,
          type: this.getFileType(file),
          url: this.getFileUrl(file),
          file: file,
          uploaded: false,
      }));

      this.filePreviews = [...this.filePreviews, ...newPreviews];
  }

  getFileType(file: File): 'image' | 'pdf' | 'other' {
      if (file.type.startsWith('image/')) {
          return 'image';
      } else if (file.type === 'application/pdf') {
          return 'pdf';
      }
      return 'other';
  }

  getFileUrl(file: File): string {
      if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
      } else if (file.type === 'application/pdf') {
          return URL.createObjectURL(file);
      }
      return '';
  }

  formatFileSize(bytes: number): string {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  removeFile(index: number): void {
      const file = this.filePreviews[index];
      if (file.url && (file.type === 'image' || file.type === 'pdf')) {
          URL.revokeObjectURL(file.url);
      }
      this.filePreviews.splice(index, 1);
  }

  clearPendingFiles(): void {
      this.filePreviews = this.filePreviews.filter((file) => file.uploaded);
  }

  uploadFiles(): void {
      const pendingFiles = this.pendingFiles;
      if (pendingFiles.length > 0 && this.iconUpload.icon !== 'mail') {
          this.uploadInProgress = true;
          this.uploadProgress = 0;

          const formData = new FormData();
          pendingFiles.forEach((filePreview) => {
              formData.append('files', filePreview.file);
          });

          this.uploadFileSvc.upload(formData).subscribe({
              next: (res) => {
                  this.uploadInProgress = false;
                  this.uploadProgress = 100;
                  this.res.emit({ stepIndex: 1, rentalValues: res.response, formData });

                  this.rentalValues = res.response;

                  // Marcar archivos como subidos
                  this.filePreviews.forEach((file) => {
                      if (!file.uploaded) {
                          file.uploaded = true;
                      }
                  });

                  this.iconUpload.icon = 'mail';
                  this.iconUpload.description = 'Enviar Email';
              },
              error: (error) => {
                  this.uploadInProgress = false;
                  console.error('Error al subir archivos:', error);
              },
          });
      }else if(this.rentalValues) {
          this.openTextInputDialog();
      }
  }

  openFilePreview(file: FilePreview): void {
      this.dialog.open(FilePreviewDialogComponent, {
          data: {
              name: file.name,
              type: file.type,
              url: file.url,
          },
          width: '80%',
          maxWidth: '1000px',
          maxHeight: '90vh',
      });
  }

  openTextInputDialog(): void {
      const dialogRef = this.dialog.open(TextInputDialogComponent, {
          width: '600px', // Ajusta según necesites
          data: {
              text:'',
              confirmSend:false
          },
          disableClose:true

      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('Comentario ingresado:', result);
          if(result.confirmSend){
              // Enviar email.
              const formData = new FormData();
              this.filePreviews.forEach((filePreview) => {
                  formData.append('files', filePreview.file);
              });

              formData.append('detalleAlquiler', JSON.stringify(this.rentalValues));
              formData.append('to', environment.OWNER_EMAIL);
              formData.append('subject', `Pago Alquiler - ${this.date.monthName} ${this.date.year}`);
              formData.append('text', result.text);

              this.uploadFileSvc.sendEmail(formData).subscribe({
                  next: (res)=> {
                      console.log(res.message);
                      // Marcar archivos como subidos
                      this.filePreviews.forEach((file) => {
                          if (!file.uploaded) {
                              file.uploaded = true;
                          }
                      });

                      this.res.emit({stepIndex:2});
                      this.endOfTheExperience = true;
                  }
              });
          }
      }
      );
  }
}

