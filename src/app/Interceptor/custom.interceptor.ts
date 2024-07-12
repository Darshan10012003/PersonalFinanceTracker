import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallApiService } from '../Services/call-api.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

   constructor(private service : CallApiService) {}
 
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   if(request.url.includes('login')){
  //     return next.handle(request);
  //   }

  //    const localtoken = sessionStorage.getItem('token');
  //   //  request = request.clone({headers : request.headers.set('authorization','Bearer ' + localtoken)})
  //    request= request.clone({setHeaders:{authorization:`Bearer ${localtoken}`}})
  //   return next.handle(request);
  // }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newReq = req;
    let token =  this.service.getToken();
    console.log("INTERSEPTOR TOKEN --->" + token)

    if(token!=null){
     newReq= newReq.clone({setHeaders:{"authorization":`Bearer ${token}`}})
    }

    console.log("Request after Interseptor " + newReq)
   //  console.log("Request after Interseptor",newReq)
      return next.handle(newReq);
     



 }
}
