import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';

import { IncomeExpenditure } from '../../income-expenditure.model';
import { FinanceService } from '../../finance.service';

@Injectable({
    providedIn:'root'
})
export class NextResolver implements Resolve<IncomeExpenditure[]>{

    constructor(private finserv:FinanceService){}

    resolve(a:ActivatedRouteSnapshot, b:RouterStateSnapshot){
        return this.finserv.getIEDB();
    }
}