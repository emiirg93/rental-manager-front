import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFilesResponse } from '../../models/upload-files-response.model';
import { BaseService } from '../../services/base.service';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService extends BaseService {

    upload(formData:FormData) : Observable<UploadFilesResponse> {
        return this.http.post<UploadFilesResponse>(`${this.baseUrl}/upload-file`,formData);
    }
}
