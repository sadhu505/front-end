import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError,take, exhaustMap} from 'rxjs';
import {throwError} from 'rxjs';

import {MemberInterface} from './member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberDBService {

  constructor(private http:HttpClient) { }

  saveAllMemberOnDB(members:MemberInterface[]){
      return this.http.put('https://sudipto-recipe-book.firebaseio.com/kalpataruMembers.json', members).pipe(
        catchError((errorRes)=>{
          console.log('errorResponse:' + errorRes)
          let errormsg='An unknown error occured';
          if(errorRes.status === 401){
            errormsg='permission denied error';
            return throwError(errormsg);
          }
          return throwError(errormsg);
      })
      )
  }

  getAllMemberFromDB(){
    return this.http.get<MemberInterface[]>('https://sudipto-recipe-book.firebaseio.com/kalpataruMembers.json').pipe(
        catchError((errorRes)=>{
          console.log('errorResponse:' + errorRes)
          let errormsg='An unknown error occured';
          if(errorRes.status === 401){
            errormsg='permission denied error';
            return throwError(errormsg);
          }
          return throwError(errormsg);
      }));
  }
}