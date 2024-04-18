import { Component, Inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //User Details from html form
  id: string = '';
  email:string = '';
  name: string = '';  
  gender: string = '';
  dob: string = '';
  courseDepartment: string = '';
  personalTraits: any[] = [];
  personalHobbies: any[] = [];
  //The password is not displayed in the form for the profile page, but is obtained from the session storage
  password: string = ''; 

  //Options that the user can choose from
  personalTraitsOptions: Array<{ value: string, display: string }> = [];
  hobbiesOptions: Array<{ value: string, display: string }> = [];
  genderOptions: string[] = [];

  //Represents the current user
  currentUser: any;

  //Driver details from html form
  driver_id: string = '';
  driver_licenseDateOfIssue: string = '';
  driver_licenseDateOfExpiry: string = '';
  driver_licenseNumber: string = '';
  driver_vehicleMake: string = '';
  driver_vehicleModel: string = '';

  constructor(private router: Router, private alertController: AlertController, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) { }

  ngOnInit() {
    //Refresh data
    this.databaseInterface.refreshData();

    //Retrieve the current user from the database
    this.currentUser = this.databaseInterface.getCurrentUser();
    
    this.assignCurrentUserValuesToFormFields();

    //Get driver details from session storage so it can be applied fully
    this.getDriverDetailsFromSessionStorage();

    //Retrieve the options that the user can choose from
    this.retrieveOptionsToChooseFrom();

    console.log('Current User: ', this.currentUser);
  }

  
  assignCurrentUserValuesToFormFields(){
    //Assign the current user values to the form fields
    this.email = this.currentUser.email;
    this.name = this.currentUser.name;
    this.gender = this.currentUser.gender;
    this.dob = this.currentUser.dob;
    this.courseDepartment = this.currentUser.courseDepartment;
    this.personalTraits = this.currentUser.personalTraits;
    this.personalHobbies = this.currentUser.personalHobbies;
  }
  
  setUserDetailsFromSessionStorage() {
    //Set user details in session storage
    sessionStorage.setItem('id', this.currentUser.id);
    sessionStorage.setItem('email', this.currentUser.email);
    sessionStorage.setItem('password', this.currentUser.password);
    sessionStorage.setItem('name', this.currentUser.name);
    sessionStorage.setItem('gender', this.currentUser.gender);
    sessionStorage.setItem('dob', this.currentUser.dob);
    sessionStorage.setItem('courseDepartment', this.currentUser.courseDepartment);
    sessionStorage.setItem('personalTraits', this.currentUser.personalTraits);
    sessionStorage.setItem('personalHobbies', this.currentUser.personalHobbies);
  }

  getUserDetailsFromSessionStorage() {
    //Get user details from session storage
    this.id = sessionStorage.getItem('id') as string;
    this.email = sessionStorage.getItem('email') as string;
    this.password = sessionStorage.getItem('password') as string;
    this.name = sessionStorage.getItem('name') as string;
    this.gender = sessionStorage.getItem('gender') as string;
    this.dob = sessionStorage.getItem('dob') as string;
    this.courseDepartment = sessionStorage.getItem('courseDepartment') as string;
    this.personalTraits = sessionStorage.getItem('personalTraits')?.split(',') as any[]; 
    this.personalHobbies = sessionStorage.getItem('personalHobbies')?.split(',') as any[];
  }

  retrieveOptionsToChooseFrom() {
    //Retrieve the gender options, personal traits options, and hobbies options from the database
    this.genderOptions = this.databaseInterface.getGenderOptions();
    this.personalTraitsOptions = this.databaseInterface.getPersonalTraitsOptions();
    this.hobbiesOptions = this.databaseInterface.getHobbiesOptions();
  }

  getDriverDetailsFromSessionStorage() {
    //Get driver details from session storage
    this.driver_id = sessionStorage.getItem('driver-id') as string;
    this.driver_licenseDateOfIssue = sessionStorage.getItem('license-date-of-issue') as string;
    this.driver_licenseDateOfExpiry = sessionStorage.getItem('license-date-of-expiry') as string;
    this.driver_licenseNumber = sessionStorage.getItem('license-number') as string;
    this.driver_vehicleMake = sessionStorage.getItem('make') as string;
    this.driver_vehicleModel = sessionStorage.getItem('model') as string;
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
      this.personalTraits = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.personalTraits;
    } else {
      // If three or fewer selections, just update the model
      this.personalTraits = event.detail.value;
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
      this.personalHobbies = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.personalHobbies;
    } else {
      // If three or fewer selections, just update the model
      this.personalHobbies = event.detail.value;
    }
  }

  //Method to apply changes made to profile
  async applyProfileChanges() {
    if (this.name && this.gender && this.dob && this.courseDepartment) {
      //Check if the user has selected at least one trait and one hobby
      if (this.personalTraits.length <= 0 || this.personalHobbies.length <= 0) {
        alert('Please make sure that you have at least one trait and one hobby selected.');
      }else{
        // Update the user details in the database
        this.applyFormValueChangesToCurrentUserValues();
        this.databaseInterface.updateCurrentUserDetails(this.currentUser);
        
        //Set the current user's email in the database
        this.databaseInterface.setCurrentUserEmail(this.currentUser.email);
  
        //Refresh the data
        this.databaseInterface.refreshData();

        alert('Changes applied successfully.');
        this.goToHomePage();
      }
    }else{
      alert('Please enter all the fields to apply changes.');
    }
  }

  applyFormValueChangesToCurrentUserValues() {
    this.currentUser.name = this.name;
    this.currentUser.gender = this.gender
    this.currentUser.dob = this.dob;
    this.currentUser.courseDepartment = this.courseDepartment;
    this.currentUser.personalTraits = this.personalTraits;
    this.currentUser.personalHobbies = this.personalHobbies;
  }

 

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  goToChangePasswordPage() {
    this.router.navigate(['/change-password']);
  }

  goToDriverDetailsPage() {
    this.router.navigate(['/driver-details']);
  }

  
}//End of class
