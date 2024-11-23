import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {FinanceService} from './finance.service';

@Component({
  selector: 'app-admin-finance',
  templateUrl: './admin-finance.component.html',
  styleUrls: ['./admin-finance.component.css']
})
export class AdminFinanceComponent implements OnInit {

  constructor(private financeService:FinanceService, 
    private router:Router,
    private route:ActivatedRoute) { }
  
    ngOnInit() {
    }
  
    adhocEmit(){
      setTimeout(()=>{
      this.financeService.adhocSwitch.next(true);          
      } ,50)
    }
}
