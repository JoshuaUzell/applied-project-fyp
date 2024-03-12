import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockDatabase } from '../mockDatabase';
import { PasswordHandlerService } from '../password-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private databaseInterface: MockDatabase, private passwordHandler: PasswordHandlerService) { }
  ngOnInit(): void {
    //this.databaseInterface.clearData();
    console.log(this.databaseInterface.retrieveAllUsers());
  }

  completeLogin() {
    this.login(this.email, this.password);
  }

  //Checks that the database contains the user's email and password
  async login(email: string, password: string) {
    const userDetails = this.databaseInterface.retrieveUserDetails(email);

    // Use the SecurityService to verify the password against the stored hash
    const isPasswordCorrect = await this.passwordHandler.verifyPassword(password, userDetails?.password ?? '');

    if (userDetails && isPasswordCorrect) {
      // Handle successful login, e.g., redirecting to a dashboard
      alert('Correct!\n User Details are \nEmail: ' + userDetails.email + '\nPassword: ' + userDetails.password);
      this.router.navigate(['/home']);
    } else if (userDetails && userDetails.password !== password) {
      alert('Incorrect Password. Please enter a correct password.');
    } else if (userDetails?.email !== email) {
      alert('Email not found. Please enter a correct email.');
    } else {
      // Handles login failure
      alert('Please enter valid credentials.');
    }

  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }

}
