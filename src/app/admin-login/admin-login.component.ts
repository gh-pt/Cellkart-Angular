import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  admin = {
    username: 'admin',
    password: 'admin123'
  }
  collectData(loginForm: any) {
    // console.log(loginForm);
    this.admin = loginForm.value;
    console.log(this.admin);
  }
}
