import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MemberService} from '../admin/admin-member/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  nickName_list:string[];

  constructor(private router:Router, 
  private memberservice: MemberService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    // this.memberservice.getfromDB();
    this.nickName_list=this.memberservice.fetchNickNames();
  }

  memberSelected(name:string){
    this.router.navigate([name],{relativeTo:this.route});
  }

  // onClickHere(){
  //   this.memberservice.getfromDB();
  // }

}
