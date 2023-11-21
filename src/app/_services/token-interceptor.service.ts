import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  

  constructor(private inject:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.inject.get(AuthenticationService)
    let jwtToken = req.clone({
      setHeaders : {
        Authorization : "Bearer "+authService.GetToken(),
      }
    });
    return next.handle(jwtToken);
  }
}
