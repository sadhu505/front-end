import { HttpInterceptor,HttpParams,HttpHandler,HttpRequest } from '@angular/common/http';
import {exhaustMap,take} from 'rxjs';
import { Injectable } from '@angular/core';

import {AuthService} from './auth.service';

@Injectable()
export class AuthIntrceptorService implements HttpInterceptor{
    constructor(private authserv: AuthService){}

    intercept(req:HttpRequest<any>, next:HttpHandler){
        return this.authserv.user.pipe(take(1),
        exhaustMap(user=>{
            if(!user){
                return next.handle(req);
            }
            const modifiedReq=req.clone({params:new HttpParams().set('auth',user.token)})
            return next.handle(modifiedReq);
        }))
    }
}