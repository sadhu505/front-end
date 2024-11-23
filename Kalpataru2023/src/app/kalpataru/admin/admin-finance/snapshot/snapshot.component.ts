import { Component, OnInit } from '@angular/core';

import {FinanceService} from '../finance.service';
import {FinanceSnapshot} from '../income-expenditure.model';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.css']
})
export class SnapshotComponent implements OnInit {

  snapshotArray:FinanceSnapshot[];
  snapTotal:number=0;

  constructor(private finserv: FinanceService) { }

  ngOnInit() {
    this.snapshotArray=this.finserv.fetchFinanceSnapshot();
    for(let item of this.snapshotArray){
      this.snapTotal +=item.amount;
    }
  }

  // onSave(){
  //   this.finserv.savesSnapshotDB().subscribe(
  //     (response)=>{
  //       console.log('snapshot saved');
  //     },
  //     (errorRes)=>{
  //       console.log(errorRes);   
  //     }
  //   )
  // }
}
