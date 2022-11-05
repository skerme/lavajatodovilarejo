import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{


intercept(minharequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

//console.log("REQUESTE ORIGINAL", minharequest)
const token = sessionStorage.getItem('token');
//console.log("MEU TOKEN",sessionStorage.getItem('token'));
//console.log("TOKEN",  sessionStorage.getItem('token'))

const newRequest= minharequest.clone({setHeaders: {'Authorization': 'Bearer '+ token
}});

//console.log("REQUESTE CLONADA",newRequest);
return next.handle(newRequest)
    }


}

