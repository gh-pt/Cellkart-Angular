import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  today=new Date();
  flag=false;
  errorMessage="";
  admin={
    username:'admin',
    password:'admin123'
  }
  constructor(private account:UserService, private router:Router,){

  }
  collectData(loginForm:any){
    this.admin=loginForm.value;
    console.log(this.admin);
    // we have to test user
    this.flag=this.account.login(this.admin.username, this.admin.password)
    if(this.flag){
        window.alert("logged in successfully....")
        localStorage.setItem("isLogin","true")
        this.router.navigate(["home"]);
    }
    else
      this.errorMessage="Incorrect username or password";
  }
}