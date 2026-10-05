import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Lấy token lưu trữ trong localStorage (hoặc sessionStorage)
  const token = localStorage.getItem('access_token');

  // 2. Nếu có token, clone request và thêm Header Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 3. Nếu không có token, cho request tiếp tục bình thường
  return next(req);
};