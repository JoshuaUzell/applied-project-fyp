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
    // Here you'd typically check the credentials, perhaps with a service that communicates with your Flask backend.
    if(this.email && this.password) {
      // If credentials are valid, navigate to your dashboard or main page
      this.router.navigate(['/home']);
    } else {
      alert('Please enter valid credentials.');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
