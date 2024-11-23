import { Component, OnInit } from '@angular/core';

import {IncomeExpenditure} from '../income-expenditure.model';
import {FinanceService} from '../finance.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  ieMainArray:IncomeExpenditure[]=[];
  eventArray:string[]=[];
  memberArray:string[]=[];
  incomeSwitch:boolean=false;
  expenditureSwitch:boolean=false;
  incomeEvent:string;
  expendMember:string;
  incomeMember:string;
  // added on 30-July-2023
  istartDate:Date;
  iendDate:Date;
  estartDate:Date;
  eendDate:Date;
  // added on 23-Dec-2024
  minDate:Date;
  maxDateValue:Date;
  totalIncome:number;
  totalExpenditure:number;
  mainIncomeArr:IncomeExpenditure[]=[];
  mainExpendArr:IncomeExpenditure[]=[];
  // deleteIndex:number;
  isLoading:boolean=false;

  constructor(private finservice: FinanceService) { }

  ngOnInit() {
    this.ieMainArray=this.finservice.fetchIEArray();
    this.minDate=new Date(2019,0,1);
    this.totalIncome=0;
    this.totalExpenditure=0;
    this.iendDate =  new Date(new Date().setDate(new Date().getDate()));
    this.eendDate =  new Date(new Date().setDate(new Date().getDate()));
    this.maxDateValue = new Date(new Date().setDate(new Date().getDate()));
    if(this.ieMainArray){
      const tempEventArray=this.ieMainArray.map((item)=>{ return item.event})
      this.eventArray=tempEventArray.filter((item,pos)=>{
        return tempEventArray.indexOf(item) == pos
      });
      this.mainIncomeArr = this.ieMainArray.filter(item => {return item.type==='i'});
      this.mainExpendArr = this.ieMainArray.filter(item => {return item.type==='e'});
      this.eventArray.splice(0,0,'--all--');
      this.memberArray=this.finservice.fetchStaticCollectors();
      this.memberArray.splice(0,0,'--all--');
    }
    
  }


  onIncomeClick(){
    this.incomeSwitch=!this.incomeSwitch
  }

  onExpenditureClick(){
    this.expenditureSwitch=!this.expenditureSwitch;
  }

  // added on 23-Dec-2024
  /**
   * This method calculaes total income
   * based on filtered report
   */
  calculateTotalIncome() {
    this.totalIncome=0;
    
    let bothStartAndEndDate = false;
    if (this.istartDate && this.iendDate) {
      bothStartAndEndDate=true;
    }
    // filtered Array
    let filteredIncomeArray:IncomeExpenditure[];
    // filter based on event
    if (this.incomeEvent) {
      if(this.incomeEvent === '--all--'){
        filteredIncomeArray=this.mainIncomeArr;
      } else {
        filteredIncomeArray = this.mainIncomeArr.filter((item)=>{
          return item.event == this.incomeEvent
        });
      }
    } else {
      filteredIncomeArray=this.mainIncomeArr;
    }
    // filter based on memeber
    if (this.incomeMember) {
      if(this.incomeMember !== '--all--'){
        filteredIncomeArray = filteredIncomeArray.filter((item)=>{
          return item.member == this.incomeMember
        });
      }
    }
    // filter based on date
    if (bothStartAndEndDate) {
      filteredIncomeArray = filteredIncomeArray.filter((item)=>{
        let tempDate = new Date(item.date);
        return tempDate.getTime() >= this.istartDate.getTime() && tempDate.getTime() <= this.iendDate.getTime()
    });
    }
    // calculate total income from filtered array
    if (filteredIncomeArray) {
      for (let item of filteredIncomeArray){
        this.totalIncome = this.totalIncome + (+item.amount);
      }
    }
  }

  /**
   * This method calculaes total expenditure
   * based on filtered report
   */
  calculateTotalExpenditure(){
    this.totalExpenditure=0;
    let bothStartAndEndDate = false;
    if (this.estartDate && this.eendDate) {
        bothStartAndEndDate=true;
    }
    let filteredExpendArray:IncomeExpenditure[];
    console.log(this.mainExpendArr);
    // filter based on memeber
    if(this.expendMember) {
      if(this.expendMember !== '--all--'){
        filteredExpendArray = this.mainExpendArr.filter((item)=>{
          return item.member == this.expendMember
        });
      } else {
      filteredExpendArray=this.mainExpendArr;
      }
    } else {
      filteredExpendArray=this.mainExpendArr;
    }   
    // filter based on date
    if (bothStartAndEndDate) {
      filteredExpendArray = filteredExpendArray.filter((item)=>{
        let tempDate = new Date(item.date);
        return tempDate.getTime() >= this.estartDate.getTime() && tempDate.getTime() <= this.eendDate.getTime()
      });
    }
    console.log(filteredExpendArray);
    // calculate total expenditure from filtered array
    if (filteredExpendArray) {
      for (let item of filteredExpendArray){
        this.totalExpenditure = this.totalExpenditure + (+item.amount);
      }
    }
  }

  onDelete(item:IncomeExpenditure){
    this.isLoading=true;
    const deleteIndex=this.ieMainArray.indexOf(item);
    this.finservice.deleteIEArray(deleteIndex);
    this.finservice.saveOnDB()
      .subscribe(
        ()=>{
          this.isLoading=false;
        })
  }

}
