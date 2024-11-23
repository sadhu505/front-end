import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { FinanceService } from '../finance.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  memberArray: string[] = [];
  isLoading: boolean = false;

  constructor(private route:ActivatedRoute, private finservice: FinanceService) { }

  ngOnInit() {
    this.memberArray = this.finservice.fetchStaticCollectors();
  }


  onTransferSubmit(f: NgForm) {
    this.isLoading = true;
    const iArray = {
      member: f.value.imember,
      event: 'adhoc',
      type: 'i',
      date: f.value.date,
      amount: f.value.amount,
      remarks: 'from ' + f.value.emember
    };
    const eArray = {
      member: f.value.emember,
      event: 'adhoc',
      type: 'e',
      date: f.value.date,
      amount: f.value.amount,
      remarks: 'to ' + f.value.imember
    };
    this.finservice.addIncomeExpenditure(iArray);
    this.finservice.addIncomeExpenditure(eArray);
    this.finservice.updateSnapshotArray(iArray.member, +f.value.amount, iArray.type);
    this.finservice.updateSnapshotArray(eArray.member, +f.value.amount, eArray.type);

    this.finservice.saveOnDB().subscribe(
      (response) => {
        f.reset();
        this.finservice.saveSnapshotDB()
          .subscribe(
            (response) => {
              this.isLoading = false;
            }
          )
      },
      (errorRes) => {
        console.log(errorRes);
      }
    )
  }
}
