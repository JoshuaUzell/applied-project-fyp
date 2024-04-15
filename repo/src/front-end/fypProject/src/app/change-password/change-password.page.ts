import { Component, Inject, OnInit } from '@angular/core';
import { PASSWORD_HANDLER_TOKEN } from '../password-handler.service';
import { IPasswordHandler } from '../passwordHandler.interface';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  //Password fields from the form 
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  currentUser: any;

  constructor(private router: Router, @Inject(PASSWORD_HANDLER_TOKEN) private passwordHandler: IPasswordHandler, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) { }

  ngOnInit() {
    //Retrieve the current user from the database
    this.currentUser = this.databaseInterface.getCurrentUser();
  }

  //Function to change the password
  async applyChangeToPassword() {
    const isPasswordCorrect = this.passwordHandler.verifyPassword(this.currentPassword, this.currentUser?.password ?? '');

    if (this.currentPassword && this.confirmNewPassword && this.newPassword) {
      if (await isPasswordCorrect) {
        if (this.passwordHandler.checkPasswordAndConfirmPasswordMatch(this.confirmNewPassword, this.newPassword)) {
          // Update the user details in the database
          this.currentUser.password = await this.passwordHandler.hashPassword(this.newPassword);
          this.databaseInterface.updateCurrentUserDetails(this.currentUser);
          this.goBackToProfilePage();
        } else {
          alert('The new password and confirm new password do not match. Please enter the same password in both fields.');
        }
      } else {
        alert('Please enter the correct password to apply changes.');
      }
    } else {
      alert('Please fill all the fields to apply changes.');
    }

  }

  goBackToProfilePage() {
    this.router.navigate(['/profile']);
  }
}
