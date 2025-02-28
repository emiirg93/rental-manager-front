import { CommonModule } from '@angular/common'
import { Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

interface FilePreview {
  name: string
  size: number
  type: 'image' | 'pdf' | 'other'
  url: string
  file: File
}

@Component({
    selector: 'app-file-preview-dialog',
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
    templateUrl: './file-preview-dialog.component.html',
    styleUrl: './file-preview-dialog.component.scss',
    standalone: true,
})
export class FilePreviewDialogComponent {
    safeUrl!: SafeResourceUrl;

    constructor(
    private dialogRef: MatDialogRef<FilePreviewDialogComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: FilePreview,
    ) {
    // Sanitizar la URL para el iframe (necesario para PDFs)
        if (this.data.type === 'pdf') {
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
        }
    }

    close(): void {
        this.dialogRef.close()
    }

    downloadFile(): void {
    // Crear un enlace temporal para descargar el archivo
        const a = document.createElement('a')
        a.href = this.data.url
        a.download = this.data.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
}

