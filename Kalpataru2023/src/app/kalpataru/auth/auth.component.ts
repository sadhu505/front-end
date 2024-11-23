import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription,Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

import {AuthResponse, AuthService} from '../shared/auth.service';
import {MemberService} from '../admin/admin-member/member.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLogedIn: boolean=true;
  isLoading:boolean=false;
  errorAlert:string;
  subscription:Subscription;

  constructor(private authService: AuthService, 
  private memberservice: MemberService,
  private router: Router) { }

  ngOnInit() {
    this.subscription=this.memberservice.refreshMember.subscribe(
      (demo:string)=>{
        this.isLoading=true;
        this.memberservice.getfromDB().subscribe(
          (res)=>{
            this.isLoading=false;
            this.router.navigate(['/admin/member']);
          }
        );
        
      }
    )
  }

  // onSwitch(){
  //   this.isLogedIn = !this.isLogedIn;
  // }

  onFormSubmit(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;

    this.errorAlert=null;
    this.isLoading=true;

    let authObs:Observable<AuthResponse>;

    if(this.isLogedIn){
      authObs= this.authService.logIn(email,password);
    }else{
      authObs=this.authService.signUp(email,password);
    }

    authObs.subscribe(
      (responseData)=>{
        // this.isLoading=true;  
        // this.router.navigate(['/admin']);    
        this.memberservice.refreshMember.next('refresh'); 
      },
      (errormsg)=>{
        this.isLoading=false;                
        this.errorAlert=errormsg;
        console.log(errormsg);
      }
    )

    form.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
