import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseInterface } from '../database.interface';
import { Inject } from '@angular/core';
import { MockDatabase } from '../mockDatabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{
  email: string = '';
  password: string = '';

  constructor(private router: Router, private databaseInterface: MockDatabase) {}
  ngOnInit(): void {
    console.log(this.databaseInterface.retrieveAllUsers());
    //this.databaseInterface.clearData();
  }
 
  completeLogin() {
    this.login(this.email, this.password);
  }

  //Checks that the database contains the user's email and password
  login(email: string, password: string) {
    const userDetails = this.databaseInterface.retrieveUserDetails(email); 
    if (userDetails && userDetails.password === password) {
      // Handle successful login, e.g., redirecting to a dashboard
      alert('Correct!\n User Details are \nEmail: ' + userDetails.email + '\nPassword: ' + userDetails.password);
      this.router.navigate(['/home']);
    } else if (userDetails && userDetails.password !== password) {
      alert('Incorrect Password. Please enter a correct password.');
    }else if (userDetails?.email !== email) {
      alert('Email not found. Please enter a correct email.');
    }else{
      // Handles login failure
      alert('Please enter valid credentials.');
    }
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
