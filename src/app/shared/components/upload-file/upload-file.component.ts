import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import type { EmiiterUploadFile } from '../../models/emitter-upload-file.model'
import { FilePreviewDialogComponent } from '../file-preview-dialog/file-preview-dialog.component'
import { UploadFileService } from './upload-file.service'

interface FilePreview {
  name: string
  size: number
  type: 'image' | 'pdf' | 'other'
  url: string
  file: File
}

@Component({
    selector: 'app-upload-file',
    imports: [CommonModule,MatButtonModule, MatIconModule, MatProgressBarModule, MatDialogModule, CommonModule],
    templateUrl: './upload-file.component.html',
    styleUrl: './upload-file.component.scss',
    standalone: true,
})
export class UploadFileComponent {
  @Input() allowMultiple = true // Permitir selección múltiple
  @Input() acceptedTypes = 'application/pdf,image/jpeg,image/png' // Tipos aceptados
  @Input() monthName!:string;
  @Output() res = new EventEmitter<EmiiterUploadFile>()

  uploadFileSvc = inject(UploadFileService)
  dialog = inject(MatDialog)

  uploadInProgress = false
  uploadProgress = 0
  selectedFiles: File[] = []
  filePreviews: FilePreview[] = []

  get validFormats() {
      return this.acceptedTypes.split(',')
  }

  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement
      if (input.files) {
          this.validateFiles(Array.from(input.files))
          this.generatePreviews()
      }
  }

  validateFiles(files: File[]) {
      this.selectedFiles = files.filter((file) => this.validFormats.includes(file.type))
      if (this.selectedFiles.length !== files.length) {
          console.warn('Algunos archivos no son válidos y fueron descartados.')
      }
  }

  generatePreviews(): void {
      this.filePreviews = []

      this.selectedFiles.forEach((file) => {
          const preview: FilePreview = {
              name: file.name,
              size: file.size,
              type: this.getFileType(file),
              url: '',
              file: file,
          }

          if (preview.type === 'image') {
              preview.url = URL.createObjectURL(file)
          } else if (preview.type === 'pdf') {
              // Para PDFs podríamos usar un ícono o una miniatura generada
              preview.url = URL.createObjectURL(file) // Guardamos la URL para el visor de PDF
          }

          this.filePreviews.push(preview)
      })
  }

  getFileType(file: File): 'image' | 'pdf' | 'other' {
      if (file.type.startsWith('image/')) {
          return 'image'
      } else if (file.type === 'application/pdf') {
          return 'pdf'
      }
      return 'other'
  }

  formatFileSize(bytes: number): string {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  removeFile(index: number): void {
      // Liberar URL para evitar memory leaks
      if (this.filePreviews[index].url) {
          URL.revokeObjectURL(this.filePreviews[index].url)
      }

      this.filePreviews.splice(index, 1)
      this.selectedFiles.splice(index, 1)
  }

  clearFiles(): void {
      // Liberar todas las URLs
      this.filePreviews.forEach((preview) => {
          if (preview.url) {
              URL.revokeObjectURL(preview.url)
          }
      })

      this.filePreviews = []
      this.selectedFiles = []
  }

  uploadFiles(): void {
      if (this.selectedFiles.length > 0) {
          this.uploadInProgress = true
          this.uploadProgress = 0

          // Simulación de progreso (puedes reemplazar con lógica real)
          const interval = setInterval(() => {
              this.uploadProgress += 10
              if (this.uploadProgress >= 100) {
                  clearInterval(interval)
                  this.completeUpload()
              }
          }, 300)

          // Preparar FormData
          const formData = new FormData()
          this.selectedFiles.forEach((file) => {
              formData.append('files', file)
          })

          // Llamada al servicio real
          this.uploadFileSvc.upload(formData).subscribe(
              (res) => {
                  this.uploadInProgress = false
                  this.uploadProgress = 100
                  this.res.emit({ rentalValues: res.response, formData })
                  this.clearFiles()
              },
              (error) => {
                  this.uploadInProgress = false
                  console.error('Error al subir archivos:', error)
              },
          )
      }
  }

  completeUpload(): void {
      // Este método se usa solo para la simulación
      this.uploadInProgress = false
  }

  openFilePreview(preview: FilePreview): void {
      this.dialog.open(FilePreviewDialogComponent, {
          width: '80%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          data: preview,
      })
  }
}

