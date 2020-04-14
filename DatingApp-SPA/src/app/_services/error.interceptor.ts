import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // tap((abc) => {
      //   console.log(abc, req);
      // }),
      // retry(1),
      catchError((httpErrorResponse) => {
        console.log(httpErrorResponse);
        if (httpErrorResponse.status === 401) {
          return throwError(httpErrorResponse.statusText);
        }
        if (httpErrorResponse instanceof HttpErrorResponse) {
          const applicationError = httpErrorResponse.headers.get(
            'Application-Error'
          );
          if (applicationError) {
            return throwError(applicationError);
          }
        }
        const serverError = httpErrorResponse.error;
        console.log(serverError);
        let modelStateError: string;
        if (serverError.errors && typeof serverError.errors === 'object') {
          for (const key in serverError.errors) {
            if (serverError.errors[key]) {
              modelStateError += serverError.errors[key] + '\n';
            }
          }
        }
        return throwError(
          modelStateError ||
            serverError.error ||
            'Server Error :' + httpErrorResponse.message
        );
      })
    );
  }
}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
