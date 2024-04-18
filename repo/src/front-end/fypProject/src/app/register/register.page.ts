import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MockDatabaseService } from '../mockDatabase.service';
import { IPasswordHandler } from '../passwordHandler.interface';
import { PASSWORD_HANDLER_TOKEN } from '../password-handler.service';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, @Inject(PASSWORD_HANDLER_TOKEN) private passwordHandler: IPasswordHandler) { }

  ngOnInit() {
    //this.databaseInterface.clearData();
    //console.log(this.databaseInterface.retrieveAllUsers());
  } 

  async completeRegistration() {
    const userDetails = {
      id: '', // Ensure the ID is a string if your interface expects it, otherwise adjust as needed
      email: this.email,
      password: '',
    };
 
    //Check if the email is valid
    if (this.isValidEmail(this.email)) {

      //Check if the email already exists, if not proceed
      if (!this.databaseInterface.emailExists(this.email)) {
        //Check if the password and confirm password match
        if (this.passwordHandler.checkPasswordAndConfirmPasswordMatch(this.password, this.confirmPassword)) {
          // Hash the password
          userDetails.password = await this.passwordHandler.hashPassword(this.password);
            
          // Generate unique ID for the user
          userDetails.id = `user_${this.databaseInterface.generateUniqueID()}`;

          //Sets the id, email and password in session storage
          sessionStorage.setItem('id', userDetails.id);
          sessionStorage.setItem('email', userDetails.email);
          sessionStorage.setItem('password', userDetails.password); 

          // Display an alert with user details
          alert(`Registration Complete!\nID: ${userDetails.id}\nEmail: ${userDetails.email}\nPassword: ${userDetails.password}`);
          this.goToUserDetails();
        }
      }else{
        alert('Email already exists. Please enter a different email.');
      }

    } else {
      alert('Please enter a valid email. Make sure there is an email, a domain and an @ symbol.\n'
        + 'Example: email@domain.com');
    }
  }
  

  isValidEmail(email: string): boolean {
    // Uses a regular expression to check if the email is valid
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  registerUser(userFormData: any): void {
    this.databaseInterface.addUserDetails(userFormData);
  }

 
  goToUserDetails() {
    this.router.navigate(['/user-details']);
  }

}
