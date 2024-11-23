import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import {FinanceService} from '../finance.service';

@Component({
  selector: 'app-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.css']
})
export class AdhocComponent implements OnInit, OnDestroy {

  adhocSwitch:boolean=false;
  eventSwitch:boolean=false;
  a:Subscription;

  constructor(private finservice: FinanceService) { }

  ngOnInit() {
    this.a=this.finservice.adhocSwitch.subscribe(
      (data)=>{
        if(data){
          this.adhocSwitch=true;
          this.eventSwitch=false;
        }
      }
    )
  }
  ngOnDestroy(){
    this.a.unsubscribe();
  }
}
