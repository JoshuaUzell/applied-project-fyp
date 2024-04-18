import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IPasswordHandler } from '../passwordHandler.interface';
import { PASSWORD_HANDLER_TOKEN } from '../password-handler.service';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, @Inject(PASSWORD_HANDLER_TOKEN) private passwordHandler: IPasswordHandler) { }
  
  ngOnInit(): void {
    //this.databaseInterface.clearData();
    //console.log(this.databaseInterface.retrieveAllUsers());
  }

  completeLogin() {
    this.login(this.email, this.password);
  }

  //Checks that the database contains the user's email and password
  async login(email: string, password: string) {
    const userDetails = this.databaseInterface.retrieveUserDetails(email);

    // Use the SecurityService to verify the password against the stored hash
    const isPasswordCorrect = await this.passwordHandler.verifyPassword(password, userDetails?.password ?? '');

    //If the user is found and their password is correct, log them in
    if (userDetails && isPasswordCorrect) {
      // Handle successful login, e.g., redirecting to a dashboard
      alert('Correct!\n User Details are \nEmail: ' + userDetails.email + '\nPassword: ' + userDetails.password);
      
      //Set the current user's email in the database
      this.databaseInterface.setCurrentUserEmail(userDetails.email);

      //Set the html fields to blank upon logging in
      this.email = ''
      this.password = '';

      //Navigate to the home page
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
