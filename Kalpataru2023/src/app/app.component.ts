import { Component, OnInit } from '@angular/core';
import { AuthService } from './kalpataru/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'kalpataru2023';

  constructor(private authService:AuthService){}

  ngOnInit(){
    this.authService.autoLogin();
  }

}
