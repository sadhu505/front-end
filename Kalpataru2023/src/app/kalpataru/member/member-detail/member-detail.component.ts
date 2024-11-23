import { Component, OnInit,OnDestroy } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

import {MemberService} from '../../admin/admin-member/member.service';
import {MemberInterface} from '../../admin/admin-member/member.model';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {

  memberName:string;
  memberObj: MemberInterface;
  memberAge: string='';

  subscription: Subscription;

  constructor(private route:ActivatedRoute, private memberservice:MemberService) { }

  ngOnInit() {
    this.subscription=this.route.params.subscribe(
      (param:Params)=>{
        this.memberName=param['name'];
        this.memberObj=this.memberservice.getMemberDetails(this.memberName);
        if(this.memberObj){
          this.calculateAge(this.memberObj.dob)
        }
      }
    )
    
  }

  calculateAge(dob:string){
    let d = new Date(dob);

    let year_count=new Date().getFullYear() - d.getFullYear();
    let month_count= new Date().getMonth() - d.getMonth();

    if(month_count<0){
      year_count--;
      month_count=month_count + 12;
    }
    this.memberAge=year_count+' Years '+month_count+' months'
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
