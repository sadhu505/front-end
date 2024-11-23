import {Pipe, PipeTransform} from '@angular/core';
import {IncomeExpenditure} from '../income-expenditure.model';


@Pipe({
    name:'ieincome'
})
export class IEPipe implements PipeTransform{
    transform(value:IncomeExpenditure[],eventInp:string,memberInp:string, startDate:Date, endDate: Date){
        if(!value){
            return value;
        }
        let bothStartAndEndDate = false;
        if (startDate && endDate) {
            bothStartAndEndDate=true;
        }
        let noEventAndNoMember = false;
        if ((!memberInp || memberInp=== '--all--') && (!eventInp || eventInp=== '--all--')) {
            noEventAndNoMember=true;
        }

        // when no eventInp and no memberInp
        if(noEventAndNoMember && !bothStartAndEndDate){
            return value.filter(item => {return item.type==='i'});
        }
        // when no eventInp and no memberInp but both startDate and endDate
        if(noEventAndNoMember && bothStartAndEndDate){
            const incomeArr = value.filter(item => {return item.type==='i'});
            const dateFilteredArray = incomeArr.filter((item)=>{
                let tempDate = new Date(item.date);
                return tempDate.getTime() >= startDate.getTime() && tempDate.getTime() <= endDate.getTime()
            });
            return dateFilteredArray;
        }
        // other combination case
        let filteredArray:any[];
        if(eventInp && (!memberInp || memberInp=== '--all--')){
            filteredArray=value.filter((item)=>{
                return item.event == eventInp && item.type === 'i'
            });
        }
        if(memberInp && (!eventInp || eventInp=== '--all--')){
            filteredArray=value.filter((item)=>{
                return item.type === 'i' && item.member === memberInp
            });
        }
        if((eventInp && memberInp) && (eventInp!== '--all--' && memberInp!== '--all--')){
            filteredArray=value.filter((item)=>{
                return item.event == eventInp && item.type == 'i' && item.member == memberInp
            });
        }
        if (bothStartAndEndDate) {
            const dateFilteredArray = filteredArray.filter((item)=>{
                let tempDate = new Date(item.date);
                return tempDate.getTime() > startDate.getTime() && tempDate.getTime() < endDate.getTime()
            });
            return dateFilteredArray;
        } else {
            return filteredArray;
        }
        
    }
}