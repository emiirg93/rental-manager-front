import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SpinnerService } from '../../shared/components/spinner/spinner.service';


export const SpinnerInterceptor: HttpInterceptorFn = (req,next) => {
    const spinnerSvc = inject(SpinnerService);
    const spinnerTimeout = setTimeout(() => {
        spinnerSvc.show();
    }, 300);

    return next(req).pipe(
        finalize(() => {
            clearTimeout(spinnerTimeout);
            spinnerSvc.hide();
        })
    );
};
