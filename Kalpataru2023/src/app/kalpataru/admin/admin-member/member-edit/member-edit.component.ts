import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {MemberInterface} from '../member.model';
import {MemberService} from '../member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit, OnDestroy {

  memberForm: FormGroup;
  isContinue:boolean=false;
  editMode=false;
  deleteMode=false;
  memberToBeEdited:string;

  constructor(private route: ActivatedRoute, 
  private router: Router,
  private memberservice:MemberService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.deleteMode= params['delete'] != null;
        if(this.deleteMode){
          this.operationOnDB();
        }else{
          this.memberToBeEdited=params['name'];
          this.editMode= params['name'] != null;
          this.init();
        }
        
      }
    )
  }
  
  private init(){
    let name='';
    let address='';
    let dob='';
    let nick='';
    let qualification='';
    let mobile='';

    if(this.editMode){
      let autofillMember:MemberInterface=this.memberservice.getMemberDetails(this.memberToBeEdited);
      if(autofillMember){
        name=autofillMember.name;
        nick=autofillMember.nickname;
        address=autofillMember.address;
        let year=autofillMember.dob.substr(0,4);
        let month=autofillMember.dob.substr(5,2);
        let date=+autofillMember.dob.substr(8,2) + 1;
        dob=month+'/'+date+'/'+year;
        qualification=autofillMember.qualification;
        mobile=autofillMember.mobile;
      }
      this.memberForm=new FormGroup({
      'name':new FormControl(name,Validators.required),
      'address':new FormControl(address,Validators.required),
      'dob':new FormControl(dob,Validators.required),
      'qualification':new FormControl(qualification,Validators.required),
      'mobile':new FormControl(mobile,[Validators.required,Validators.pattern(/(7|8|9)\d{9}/),Validators.maxLength(10)])
    })
      
    }else{
      this.memberForm=new FormGroup({
      'name':new FormControl(name,Validators.required),
      'nick':new FormControl(nick,[Validators.required,this.checkExistingNick.bind(this)]),
      'address':new FormControl(address,Validators.required),
      'dob':new FormControl(dob,Validators.required),
      'qualification':new FormControl(qualification,Validators.required),
      'mobile':new FormControl(mobile,[Validators.required,Validators.pattern(/(7|8|9)\d{9}/),Validators.maxLength(10)])
    })
    }

  }

  memberFormSubmit(){
    if(this.editMode){
      let new_edit_member={
        name:this.memberForm.value.name,
        nickname:this.memberToBeEdited,
        address:this.memberForm.value.address,
        dob:this.memberForm.value.dob,
        qualification:this.memberForm.value.qualification,
        mobile:this.memberForm.value.mobile
      }
      this.memberservice.EditMember(this.memberToBeEdited,new_edit_member);
      this.operationOnDB();      
    }else{
      let new_edit_member={
        name:this.memberForm.value.name,
        nickname:this.memberForm.value.nick.toLowerCase(),
        address:this.memberForm.value.address,
        dob:this.memberForm.value.dob,
        qualification:this.memberForm.value.qualification,
        mobile:this.memberForm.value.mobile
      }
      this.memberservice.AddMember(new_edit_member);
      this.operationOnDB();
    }
  }

  operationOnDB(){
    this.isContinue=true;
    this.memberservice.saveOnDB().
      subscribe(
        (response)=>{
        this.memberservice.getfromDB()
        .subscribe(
          (res)=>{
            this.isContinue=false; 
            if(this.editMode || this.deleteMode){
              this.router.navigate(['/member'])
            }else{
              alert('Member successfully added');
              console.log(this.editMode);
              this.memberForm.reset();
            }
          }
        )
        },
        (errormsg)=>{
          this.isContinue=false;          
          console.log(errormsg);
        }
      )
  }

  checkExistingNick(input: FormControl){
    if(input.value){ var inpNick=input.value.toLowerCase();}
    const nickNames= this.memberservice.fetchNickNames();
    if(nickNames.indexOf(inpNick) !== -1){
      return {duplicateNick:true};
    }else{
      return null;
    }
  }

  ngOnDestroy(){
    this.isContinue=false;  
  }

}
