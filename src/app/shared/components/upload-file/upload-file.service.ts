import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFilesResponse } from '../../models/upload-files-response.model';
import { BaseService } from '../../services/base.service';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService extends BaseService {

    upload(formData:FormData) : Observable<UploadFilesResponse> {
        return this.http.post<UploadFilesResponse>(`${this.apiUrl}/upload-files`,formData);
    }

    sendEmail(formData:FormData) : Observable<{message:string}> {
        return this.http.post<{message:string}>(`${this.apiUrl}/email/send`,formData);
    }
}
