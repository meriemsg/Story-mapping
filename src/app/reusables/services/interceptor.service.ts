//
// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpResponse
// } from '@angular/common/http';
//
// import {Injectable} from '@angular/core';
// import {Router} from '@angular/router';
// import {CookieService} from 'ngx-cookie-service';
// import {Observable, throwError} from 'rxjs';
// import {catchError, map} from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class InterceptorService implements HttpInterceptor {
//
//   username: string;
//   password: string;
//   key: string;
//
//   constructor(private CookieService: CookieService, private route: Router) {
//     this.username = this.CookieService.get('username');
//     this.password = this.CookieService.get('password');
//     this.key = this.CookieService.get('key');
//
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//     request = this.addkey(request, this.key);
//
//     return next.handle(request).pipe(catchError((error) => {
//       if (error instanceof HttpErrorResponse && error.status === 401) {
//         return this.handle401Error(request, next);
//       } else {
//         return throwError(error);
//       }
//     }));
//
//   }
//
//   private addkey(request: HttpRequest<any>, token: string) {
//     return request.clone({
//       setHeaders: {
//         'key': `${this.key}`
//       }
//     });
//   }
//
//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     return next.handle(request).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//         }
//         return event;
//       }),
//       catchError((error) => {
//         const err = error.error.message || error.statusText;
//         this.route.navigate(['/'])
//         return throwError(error);
//       }));
//   }
//
//
// }
