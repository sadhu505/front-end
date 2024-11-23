import {Pipe, PipeTransform} from '@angular/core';
import {IncomeExpenditure} from '../income-expenditure.model';


@Pipe({
    name:'ieexpend'
})
export class IEPipe2 implements PipeTransform{
    transform(value:IncomeExpenditure[],memberInp:string,startDate:Date, endDate: Date){
        if(!value){
            return value;
        }

        let bothStartAndEndDate = false;
        if (startDate && endDate) {
            bothStartAndEndDate=true;
        }

        if((!memberInp || memberInp==='--all--') && bothStartAndEndDate){
            const expenditureArr = value.filter(item => {return item.type==='e'});
            const dateFilteredArray = expenditureArr.filter((item)=>{
                let tempDate = new Date(item.date);
                return tempDate.getTime() >= startDate.getTime() && tempDate.getTime() <= endDate.getTime()
            });
            return dateFilteredArray;
        }

        let filteredArray:IncomeExpenditure[]=value;
        if(!memberInp || memberInp==='--all--'){
            return value.filter(item => {return item.type==='e'});
        }else{
            filteredArray=value.filter((item)=>{
                return item.member == memberInp && item.type === 'e'
            });
        }
        if (bothStartAndEndDate) {
            const dateFilteredArray = filteredArray.filter((item)=>{
                let tempDate = new Date(item.date);
                return tempDate.getTime() >= startDate.getTime() && tempDate.getTime() <= endDate.getTime()
            });
            return dateFilteredArray;
        } else {
            return filteredArray;
        }
        
    }
}