import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {FormControl,FormGroup,Validators} from '@angular/forms';

import {MemberService} from './member.service';


@Component({
  selector: 'app-admin-member',
  templateUrl: './admin-member.component.html',
  styleUrls: ['./admin-member.component.css']
})
export class AdminMemberComponent implements OnInit {

  loginForm: FormGroup;
  nickName_list:string[];
  form_display: boolean=false;
  edit_delete:boolean=false;
  deleteSwitch:boolean=false;
  add_edit_switch:boolean;


constructor(private route: ActivatedRoute,private router:Router,private memberservice: MemberService) { }

ngOnInit() {
  this.loginForm=new FormGroup({});
}


addMember(){
  this.loginForm.reset(); 
  this.add_edit_switch=true;   
  this.form_display=true;
  this.edit_delete=false;
  this.deleteSwitch=false;
  this.loginForm=new FormGroup({
    'id':new FormControl(null,[Validators.required,this.checkId]),
    'pswd':new FormControl(null, [Validators.required,Validators.minLength(6)])
  })
}

editMember(){
  this.loginForm.reset();
  this.form_display=true;
  this.add_edit_switch=false;       
  this.edit_delete=true;
  this.deleteSwitch=false;
  this.loginForm=new FormGroup({
    'id':new FormControl(null,[Validators.required,this.checkId]),
    'pswd':new FormControl(null, [Validators.required,Validators.minLength(6)]),
    'memberlist':new FormControl(null, Validators.required)
  })
}

deleteMember(){
  this.deleteSwitch=true;
  this.edit_delete=true;
  this.form_display=true;
  this.loginForm=new FormGroup({
    'id':new FormControl(null,[Validators.required,this.checkId]),
    'pswd':new FormControl(null, [Validators.required,Validators.minLength(6)]),
    'memberlist':new FormControl(null, Validators.required)
  })
}

onCancel(){
  this.form_display=false;
  this.edit_delete=false;
  this.deleteSwitch=false;
}

onSubmit(){

  if (this.deleteSwitch){
    this.memberservice.DeleteMember(this.loginForm.value.memberlist);
    this.router.navigate(['delete'],{relativeTo:this.route});
  }else{
    if(this.edit_delete){
    this.router.navigate([this.loginForm.value.memberlist,'edit'],{relativeTo:this.route})
    }else{
      this.router.navigate(['add'],{relativeTo:this.route})
    }
  }
  this.loginForm.reset();
  this.onCancel();
}

checkId(input:FormControl){
  if(input.value === 'santu' || input.value === 'sanu'){
    return null;
  }else{
    return {invalidUser:true};
  }
}
}
