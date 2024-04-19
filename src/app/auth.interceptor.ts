import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("interceptor tetiklendi")
  const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDg5NmY3ZC1hZjdlLTRmOTAtYjBhYi1kMDA1NGM5ZWZhYWYiLCJlbWFpbCI6ImVnZW1lbmMyMTAyQGdtYWlsLmNvbSIsImV4cCI6MTcxMzUzODQyNiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDA4IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.jqsMnh02vADcIyEyAT_zGdKZfmie6JINfwXz3sG4Em1aJEaIXBaTPKDSmb4JZMXr0rN8dv7z3URM_39xgPOW5w";
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(reqWithHeader);
};
