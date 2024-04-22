import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("interceptor tetiklendi")

  const authToken = inject(AuthService).getAuthToken();
 
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });
  return next(reqWithHeader);
};
