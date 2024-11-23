import { Injectable } from '@angular/core';
import {catchError} from 'rxjs';
import {throwError} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {IncomeExpenditure,FinanceSnapshot} from './income-expenditure.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceDBService {

  constructor(private http:HttpClient) { }

  saveIEInDB(fullArray:IncomeExpenditure[]){
    return this.http.put('https://sudipto-recipe-book.firebaseio.com/kalpataruIE.json', fullArray).pipe(
        catchError((errorRes)=>{
          console.log('errorResponse:' + errorRes);
          let errormsg='An unknown error occured';
          if(errorRes.status === 401){
            errormsg='permission denied error';
            return throwError(errormsg);
          }
          return throwError(errormsg);
      })
    )
  }

  getIEFromDB(){
    return this.http.get<IncomeExpenditure[]>('https://sudipto-recipe-book.firebaseio.com/kalpataruIE.json');
  }

  saveFinanceInDB(snapshotArray:FinanceSnapshot[]){
    return this.http.put('https://sudipto-recipe-book.firebaseio.com/FinanceSnapshot.json', snapshotArray).pipe(
        catchError((errorRes)=>{
          console.log('errorResponse:' + errorRes);
          let errormsg='An unknown error occured';
          if(errorRes.status === 401){
            errormsg='permission denied error';
            return throwError(errormsg);
          }
          return throwError(errormsg);
      })
    )
  }

  getFinanceFromDB(){
    return this.http.get<FinanceSnapshot[]>('https://sudipto-recipe-book.firebaseio.com/FinanceSnapshot.json');
  }

  
}