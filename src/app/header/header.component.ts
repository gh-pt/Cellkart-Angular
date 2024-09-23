import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check login status initially
    this.checkLoginStatus();

    // Subscribe to router events to check login status on route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  checkLoginStatus() {
    // If 'isLogin' is 'true' in localStorage, user is logged in
    const loginStatus = localStorage.getItem('isLogin');
    this.isLogin = loginStatus === 'true';
  }

  logout() {
    // Remove the 'isLogin' item from localStorage and navigate to login page
    localStorage.removeItem('isLogin');
    // this.router.navigate(['/login']);
    window.location.reload();
  }
}
