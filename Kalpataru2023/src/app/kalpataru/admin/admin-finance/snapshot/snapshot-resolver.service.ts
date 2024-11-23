import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';

import { FinanceSnapshot } from '../income-expenditure.model';
import { FinanceService } from '../finance.service';


@Injectable({
    providedIn:'root'
})
export class SnapshotResolver implements Resolve<FinanceSnapshot[]>{

    constructor(private finserv:FinanceService){}

    resolve(a:ActivatedRouteSnapshot,b:RouterStateSnapshot){
        return this.finserv.getSnapshotDB();
    }

}