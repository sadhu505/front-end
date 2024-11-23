import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {tap} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {MemberInterface} from './member.model';
import {MemberDBService} from './member-db.service';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  refreshMember= new Subject<string>();

  nickNameArray:string[]=[];

  memberArray: MemberInterface[]=[]

  constructor(private memberDB:MemberDBService, 
  private route: ActivatedRoute,
  private router: Router) { }

  getMemberDetails(name:string){
    const memberDetails=this.memberArray.filter(
                                      (member)=>{ return member.nickname.toUpperCase() == name.toUpperCase()}
                                    );
    if(memberDetails.length){
      return memberDetails[0];
    }else return null;
  }

  fetchNickNames(){
    return this.nickNameArray;
  }

  saveOnDB(){
    return this.memberDB.saveAllMemberOnDB(this.memberArray);
  }

  getfromDB(){
     return this.memberDB.getAllMemberFromDB().pipe(
       tap(
         (res)=>{
          this.memberArray=[...Object.keys(res).map(key=>{return res[key]})];
          const nickArray=[];
          for (let member of this.memberArray){
            nickArray.push(member.nickname);
          }
          this.nickNameArray=nickArray;
         }
       )
     )
    
  }

  AddMember(modmem: MemberInterface){
    this.memberArray.push(modmem);
  }

  EditMember(nick:string, updatedMember:MemberInterface){
    let index=this.edit_delete_logic(nick);
    this.memberArray[index]=updatedMember;
  }

  DeleteMember(nick:string){
    let index=this.edit_delete_logic(nick);
    this.memberArray.splice(index,1);
  }

  edit_delete_logic(name:string):number{
    let index:number;
    for (let member=0;member<this.memberArray.length;member++){
      if(this.memberArray[member].nickname.toUpperCase() === name.toUpperCase()){
        index=member;
        break;
      }
    }
    return index;
  }

  


}