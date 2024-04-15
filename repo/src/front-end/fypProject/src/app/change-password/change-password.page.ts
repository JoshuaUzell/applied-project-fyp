import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  //Function to change the password
  applyChangeToPassword() {
    //const isPasswordCorrect = this.passwordHandler.verifyPassword(this.currentPassword, this.currentUser?.password ?? '');
    //this.currentUser.password = await this.passwordHandler.hashPassword(this.newPassword);

    // if (await isPasswordCorrect) {
    //   if (this.passwordHandler.checkPasswordAndConfirmPasswordMatch(this.confirmNewPassword, this.newPassword)) {
    //     // Update the user details in the database
    //     this.currentUser.password = await this.passwordHandler.hashPassword(this.newPassword);
    //     this.reApplyChanges();
    //     this.databaseInterface.updateCurrentUserDetails(this.currentUser);
    //     this.goToHomePage();
    //   }else{
    //     alert('The new password and confirm new password do not match. Please enter the same password in both fields.');
    //   }
    // }else{
    //   alert('Please enter the correct password to apply changes.');
    // }
  }

}
