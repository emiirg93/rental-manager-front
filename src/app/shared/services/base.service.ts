import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    protected readonly http = inject(HttpClient);
    protected readonly apiUrl = environment.api_url;

    protected createQueryParams(params: Record<string, string | number | boolean>): HttpParams {
        let queryParams = new HttpParams();
        Object.keys(params).forEach((key) => {
            queryParams = queryParams.set(key, params[key]);
        });
        return queryParams;
    }
}
