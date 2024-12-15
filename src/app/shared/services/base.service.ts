import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    protected readonly http = inject(HttpClient);
    protected readonly baseUrl = 'http://localhost:3000';

    protected createQueryParams(params: Record<string, string | number | boolean>): HttpParams {
        let queryParams = new HttpParams();
        Object.keys(params).forEach((key) => {
            queryParams = queryParams.set(key, params[key]);
        });
        return queryParams;
    }
}
