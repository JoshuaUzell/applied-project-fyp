import { Component, Inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';
import { PASSWORD_HANDLER_TOKEN } from '../password-handler.service';
import { IPasswordHandler } from '../passwordHandler.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  dob: string = '';
  courseDepartment: string = '';
  selectedTraits: any[] = [];
  selectedHobbies: any[] = [];
  personalTraitsOptions: Array<{ value: string, display: string }> = [];
  hobbiesOptions: Array<{ value: string, display: string }> = [];
  genderOptions: string[] = [];

  currentUser: any;

  constructor(private router: Router, private alertController: AlertController, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, @Inject(PASSWORD_HANDLER_TOKEN) private passwordHandler: IPasswordHandler) { }

  ngOnInit() {
    //Retrieve the gender options, personal traits options, and hobbies options from the database
    this.genderOptions = this.databaseInterface.getGenderOptions();
    this.personalTraitsOptions = this.databaseInterface.getPersonalTraitsOptions();
    this.hobbiesOptions = this.databaseInterface.getHobbiesOptions();

    //Retrieve the current user from the database
    this.currentUser = this.databaseInterface.getCurrentUser();

    //Assign the user details to the form fields
    this.assignUserDetails();
  }

  assignUserDetails() {
    if (this.currentUser) {
      this.id = this.currentUser.id || '';
      this.name = this.currentUser.name || '';
      this.email = this.currentUser.email || '';
      this.gender = this.currentUser.gender || '';
      this.dob = this.currentUser.dob || '';
      this.courseDepartment = this.currentUser.courseDepartment || '';
      this.selectedTraits = this.currentUser.personalTraits || [];
      this.selectedHobbies = this.currentUser.personalHobbies || [];
    }
  }

  async limitSelectionOfTraits(event: any) {
    // Check if more than three traits are selected
    if (event.detail.value.length > 3) {
      // Present an alert to the user
      const alert = await this.alertController.create({
        header: 'Selection Limit',
        message: 'You can only select up to 3 traits.',
        buttons: ['OK']
      });

      await alert.present();

      // Set the selectedTraits to the first three selections
      this.selectedTraits = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.selectedTraits;
    } else {
      // If three or fewer selections, just update the model
      this.selectedTraits = event.detail.value;
    }
  }

  async limitSelectionOfHobbies(event: any) {
    // Check if more than three traits are selected
    if (event.detail.value.length > 3) {
      // Present an alert to the user
      const alert = await this.alertController.create({
        header: 'Selection Limit',
        message: 'You can only select up to 3 hobbies.',
        buttons: ['OK']
      });

      await alert.present();

      // Set the selectedHobbies to the first three selections
      this.selectedHobbies = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.selectedHobbies;
    } else {
      // If three or fewer selections, just update the model
      this.selectedHobbies = event.detail.value;
    }
  }

  //Method to update the user details
  async applyChanges() {
    if (this.id && this.name && this.email && this.gender && this.dob && this.courseDepartment && this.selectedTraits && this.selectedHobbies) {
      // Update the user details in the database
      this.reApplyChanges();
      this.databaseInterface.updateCurrentUserDetails(this.currentUser);
      this.goToHomePage();
    }else{
      alert('Please enter all the fields to apply changes.');
    }
  }

  reApplyChanges() {
    this.currentUser.name = this.name;
    this.currentUser.email = this.email;
    this.currentUser.gender = this.gender
    this.currentUser.dob = this.dob;
    this.currentUser.courseDepartment = this.courseDepartment;
    this.currentUser.selectedTraits = this.selectedTraits;
    this.currentUser.selectedHobbies = this.selectedHobbies;
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  goToChangePasswordPage() {
    this.router.navigate(['/change-password']);
  }
}
