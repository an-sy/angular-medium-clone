import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PersistanceService } from "./persistance.service";

@Injectable()
export class AuthIntercepter implements HttpInterceptor{
  constructor(private persitenceService: PersistanceService){}
  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler): 
    Observable<HttpEvent<any>> {
      const token = this.persitenceService.get('accessToken')
      req = req.clone({
        setHeaders: {
          Authorization: token ? `Token ${token}` : ''
        }
       })
      return next.handle(req)
    }

}