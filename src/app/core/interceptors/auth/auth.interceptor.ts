import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  if (req.url.includes('themealdb.com')) {
    return next(req);
  }

  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }) : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        authService.logout();
        router.createUrlTree(['/login']);
      }

      return throwError(() => error);
    })
  );
};
