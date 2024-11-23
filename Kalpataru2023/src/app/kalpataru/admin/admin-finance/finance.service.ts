import { Injectable } from '@angular/core';
import {Router, Route, ActivatedRoute} from '@angular/router';
import {Subject,throwError} from 'rxjs';
import {tap,catchError} from 'rxjs';


import {IncomeExpenditure, FinanceSnapshot} from './income-expenditure.model';
import {FinanceDBService} from './finance-db.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  adhocSwitch=new Subject<boolean>();

  private financeSnapshotArray:FinanceSnapshot[]=[];
  private ieArray:IncomeExpenditure[]=[];
  private staticCollectors:string[]=['santu','amit', 'banti','saikat','sanu','bappa da', 'Bank']
  private eventArray:string[]=[];

  constructor(private financedb: FinanceDBService,
  private route: ActivatedRoute,
  private router: Router) { }

  addIncomeExpenditure(newIE:IncomeExpenditure){
    this.ieArray.push(newIE);
  }

  eventIncome(eventI:IncomeExpenditure){
    this.ieArray.push(eventI);    
  }

  fetchStaticCollectors(){
    return this.staticCollectors.slice();
  }

  fetchIEArray(){
    return this.ieArray;
  }

  fetchevevntArray(){
    return this.eventArray;
  }


  fetchFinanceSnapshot(){
    return this.financeSnapshotArray;
  }

  updateSnapshotArray(updatename:string, amount:number,iemode:string){
    for (let i=0; i<this.financeSnapshotArray.length;i++){
      if(this.financeSnapshotArray[i].name === updatename){
        if(iemode === 'i'){
          this.financeSnapshotArray[i].amount += amount;
        }
        if(iemode === 'e'){
          this.financeSnapshotArray[i].amount -= amount;
        }
        break;
      }
    }
  }

  deleteIEArray(index:number){
    this.ieArray.splice(index,1);
  }

  saveOnDB(){
    return this.financedb.saveIEInDB(this.ieArray);
  }

  getIEDB(){
    return this.financedb.getIEFromDB().pipe(
      catchError((errorRes)=>{
          console.log('errorResponse:' + errorRes);
          let errormsg='An unknown error occured';
          if(errorRes.status === 401){
            errormsg='permission denied error';
            return throwError(errormsg);
          }
          return throwError(errormsg);
      }),
      tap(
        (ie)=>{
          this.ieArray=ie.filter((item)=>{
            return item != null;
          });
          const demoArray=[];
          if(this.ieArray){
            for (let item of this.ieArray){
              if(item.event !== 'adhoc')demoArray.push(item.event);
            }
            this.eventArray=demoArray.filter((item,pos)=>{return demoArray.indexOf(item) == pos}).sort();
          }else{
            this.eventArray=[];
          }
          
        }
      )
    )
  }

  saveSnapshotDB(){
    return this.financedb.saveFinanceInDB(this.financeSnapshotArray); //for future use
  }


  getSnapshotDB(){
    return this.financedb.getFinanceFromDB().pipe(
      tap(
        (snapshot)=>{
          this.financeSnapshotArray=snapshot;
        }
      ),
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
  
}