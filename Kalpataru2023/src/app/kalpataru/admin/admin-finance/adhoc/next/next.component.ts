import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

import {FinanceService} from '../../finance.service';

@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.css']
})
export class NextComponent implements OnInit {

  adhocIncomemode:boolean=false;
  adhocExpendituremode:boolean=false;
  eventMode:boolean=false;
  isLoading:boolean=false;
  eventArray:string[];
  newEvent:string;
  staticCollectors:string[];
  remarksLabel:string;minDate:Date;maxDate:Date;
  
  constructor(private route:ActivatedRoute, private finservice:FinanceService) { }

  ngOnInit() {
    
    this.minDate=new Date(2019,0,1);
    this.maxDate=new Date(new Date().setDate(new Date().getDate()));;
    this.staticCollectors=this.finservice.fetchStaticCollectors();
    switch(this.route.snapshot.params['next']){
      case 'adhocincome':
            this.remarksLabel="Kivabe income hoyeche";         
            this.adhocIncomemode=true;
            break;
      case 'adhocexpenditure':
            this.remarksLabel="Kivabe khoroch hoyeche";           
            this.adhocExpendituremode=true;
            break;
      case 'eventincome':
            this.eventMode=true;
            this.remarksLabel="Ke taka diyeche?";
            this.eventArray=this.finservice.fetchevevntArray();
            break;
    }
  }

  classPicker(){
    return {
      income:this.adhocIncomemode,
      expenditure:this.adhocExpendituremode,
      eventMode:this.eventMode
    }
  }

  onIEformSubmit(f:NgForm){
    this.isLoading=true;
    const ieArray={
      member:f.value.member,
      event:this.eventMode ? f.value.event : 'adhoc',
      type:this.eventMode||this.adhocIncomemode? 'i' : 'e',
      date:f.value.date,
      amount:f.value.amount,
      remarks:f.value.remarks
    };
    this.finservice.addIncomeExpenditure(ieArray);
    this.finservice.updateSnapshotArray(ieArray.member,+ieArray.amount,ieArray.type);

    this.finservice.saveOnDB().subscribe(
      (response)=>{
        f.reset();
        //write logic for snapshot update in DB
        this.finservice.saveSnapshotDB()
        .subscribe(
          (response)=>{
            this.isLoading=false;
          }
        )
        //end snapshot
      },
      (errorRes)=>{
        console.log(errorRes);
      }
    )
  }

  onButtonClick(){
    if(this.newEvent)this.eventArray.push(this.newEvent);
    this.newEvent='';
  }
}
