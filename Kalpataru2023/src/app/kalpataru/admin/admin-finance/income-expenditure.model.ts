export interface IncomeExpenditure{
    member:string,
    event:string,
    type:string,
    date: Date,
    amount:number,
    remarks:string
}

export interface FinanceSnapshot{
    name:string,
    amount:number
}