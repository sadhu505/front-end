import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError,tap} from 'rxjs';
import {throwError, BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

import {AuthUser} from './memberAuth.model';
import {MemberService} from '../admin/admin-member/member.service';
import {environment} from '../../../environments/environment';


export interface AuthResponse {
    kind: string,
    idToken: string,
    email:string,
    refreshToken: string,
    expiresIn: string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{

    user = new BehaviorSubject<AuthUser>(null);
    clearLogoutTimer:any;

    constructor(private http:HttpClient, private router:Router, private memberservice:MemberService){}

    signUp(email:string,pswrd:string){
        return this.http.post<AuthResponse>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+environment.firebaseAPI,
        {
            email:email,
            password:pswrd,
            returnSecureToken:true
        }).pipe(catchError(this.constError), tap(
            resData=>{
                this.handleMemberAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }
        ))
    };

    logIn(email:string,pswrd:string){
        return this.http.post<AuthResponse>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+environment.firebaseAPI,
        {
            email:email,
            password:pswrd,
            returnSecureToken:true
        }).pipe(catchError(this.constError), tap(
            resData=>{
                this.handleMemberAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }
        ))
    };

    private handleMemberAuth(email:string, id:string, token:string, expiresIn:number){
        const expiresInDate= new Date(new Date().getTime() + expiresIn*1000 - 40*60*1000);
        const newuser= new AuthUser(email,id,token,expiresInDate);
        this.user.next(newuser);
        this.autoLogout(expiresIn * 1000 - 40*60*1000);
        localStorage.setItem('authData',JSON.stringify(newuser));
    }

    autoLogin(){
        const userData:{
            email:string,
            memberId:string,
            _token:string,
            _expiresTokenDate:string
        }=JSON.parse(localStorage.getItem('authData'));

        if(userData){
            const localUser=
            new AuthUser(userData.email,userData.memberId,userData._token,new Date(userData._expiresTokenDate));

            if(localUser.token){
                this.user.next(localUser);
                const remainingTime=new Date(userData._expiresTokenDate).getTime() - new Date().getTime();
                if(this.clearLogoutTimer){
                    clearTimeout(this.clearLogoutTimer);
                    console.log('timer cleared');
                    this.clearLogoutTimer=null;
                    }
                this.autoLogout(remainingTime);
                this.memberservice.getfromDB();
            }
        }else{
                this.router.navigate(['/home']);
            }
        
    }

    private constError(errorRes: HttpErrorResponse){
        let errormsg="unknown error occured";

        if(!errorRes.error || !errorRes.error.error){
                    return throwError(errormsg);      
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errormsg='This email Id is not registered';
                break;
            case 'INVALID_PASSWORD':
                errormsg='Password is invalid';
                break;
            case 'USER_DISABLED':
                errormsg='This email Id is not found';
                break;
            case 'EMAIL_EXISTS':
                errormsg:'Email already registered';
                break;
            default:
                break;
        }
        return throwError(errormsg);
    }

    logOut(){
        this.user.next(null);
        localStorage.removeItem('authData');
        if(this.clearLogoutTimer){
            clearTimeout(this.clearLogoutTimer);
        }
        this.clearLogoutTimer=null;
        this.router.navigate(['/home']);
    }

    autoLogout(expiresInTimer:number){
        this.clearLogoutTimer=setTimeout(this.logOut.bind(this),expiresInTimer)
    }

}