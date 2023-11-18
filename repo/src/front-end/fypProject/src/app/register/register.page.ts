import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToProfileDetails() {
    // Here you'd typically check the credentials, perhaps with a service that communicates with your Flask backend.
    if(this.email && this.password && this.confirmPassword) {
      // If credentials are valid, navigate to your dashboard or main page
      if (this.password === this.confirmPassword) {
        // If credentials are valid, navigate to your dashboard or main page
        alert('Success!');
        this.router.navigate(['/user-details']);
      } else {
        alert('Passwords do not match.');
      }
    } else {
      alert('Please enter valid credentials.');
    }
  }

}
