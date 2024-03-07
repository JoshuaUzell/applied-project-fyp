import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseInterface } from '../database.interface';
import { Inject } from '@angular/core';
import { MockDatabase } from '../mockDatabase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private databaseInterface: MockDatabase) {}

  ngOnInit() {
    console.log(this.databaseInterface.retrieveAllUsers());
    //this.databaseInterface.clearData();
  }

  completeRegistration() {
    const userDetails = {
      id: '', // Ensure the ID is a string if your interface expects it, otherwise adjust as needed
      email: this.email,
      password: this.password, 
    };

    if(userDetails.email){
      //Check if the password and confirm password match
      if (this.checkPasswordMatch()) {
        this.registerUser(userDetails);
        // Display an alert with user details
        alert(`Registration Complete!\nID: ${userDetails.id}\nEmail: ${userDetails.email}\nPassword: ${userDetails.password}`);
        this.goToUserDetails();
      }
    }else{
      alert('Please enter a valid email.');
    }
  }

  registerUser(userFormData: any): void {
    this.databaseInterface.addUserDetails(userFormData);
  }

  checkPasswordMatch() : boolean{
    //Check if password and confirm password exist, if so, check if they match, if not, display an alert
    if(this.password && this.confirmPassword) {
      //Check if password and confirm password match
      if (this.password === this.confirmPassword) {
        // If credentials are valid, return true, else return false
        alert('Success! This is the correct password!');
        return true;
      } else {
        alert('Passwords do not match. Please enter the same password in both fields.');
        return false;
      }
    } else {
      alert('Please enter all the password fields.');
      return false;
    }
  }

  goToUserDetails() {
    this.router.navigate(['/user-details']);
  }

}
