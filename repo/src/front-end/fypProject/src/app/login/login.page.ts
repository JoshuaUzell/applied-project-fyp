import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if(this.email && this.password) {
      this.router.navigate(['/home']);
    } else {
      alert('Please enter valid credentials.');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
