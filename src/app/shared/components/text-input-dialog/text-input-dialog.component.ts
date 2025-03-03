import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'app-text-input-dialog',
    imports: [CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,],
    templateUrl: './text-input-dialog.component.html',
    styleUrl: './text-input-dialog.component.scss'
})
export class TextInputDialogComponent {
    constructor(
    public dialogRef: MatDialogRef<TextInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { confirmSend:boolean,text: string }
    ) {}

    onCancel(): void {
        this.data.confirmSend = false;
        this.dialogRef.close(this.data);
    }

    onAccept(): void {
        this.data.confirmSend = true;
        this.dialogRef.close(this.data);
    }
}
