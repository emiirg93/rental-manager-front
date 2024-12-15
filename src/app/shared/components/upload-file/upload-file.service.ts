import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService extends BaseService {

    upload(formData:FormData) {
        return this.http.post(`${this.baseUrl}/upload-file`,formData);
    }
}
