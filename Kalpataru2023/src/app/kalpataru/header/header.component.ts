import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from '../shared/auth.service';
import {MemberService} from '../admin/admin-member/member.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  isAuthenticated:boolean=false;
  

  constructor(private authService:AuthService, private memberservice: MemberService) { }


  ngOnInit() {
    this.subscription= this.authService.user.subscribe(
      user=>{
        this.isAuthenticated = !!user; // !user ? false :true
      }
    )
  }

  onMemberRefresh(){
    this.memberservice.refreshMember.next('refresh');
  }

  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }  

}
