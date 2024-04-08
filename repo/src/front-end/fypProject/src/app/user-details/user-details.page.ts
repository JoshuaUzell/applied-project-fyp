import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IDatabaseInterface } from '../database.interface';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  applyForDriverText: string = 'Apply for Driver';

  // Gender options which will contain options from the database
  genderOptions: string[] = [];

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

  driver_id: string = '';
  driver_licenseDateOfIssue: string = '';
  driver_licenseDateOfExpiry: string = '';
  driver_licenseNumber: string = '';
  driver_vehicleMake: string = '';
  driver_vehicleModel: string = '';

  constructor(private router: Router, private alertController: AlertController
    , @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) {
  }

  ngOnInit() {
    //this.databaseInterface.clearData();

    //Print session storage for user and driver
    console.log('Session Storage for user: ' + sessionStorage.getItem('id') + ' ' + sessionStorage.getItem('email') + ' ' + sessionStorage.getItem('password'));
    console.log('Session Storage for driver: ' + sessionStorage.getItem('driver-id') + ' '
      + sessionStorage.getItem('license-date-of-issue') + ' ' + sessionStorage.getItem('license-date-of-expiry') + ' ' + sessionStorage.getItem('license-number')
      + ' ' + sessionStorage.getItem('make') + ' ' + sessionStorage.getItem('model'));

    this.getUserDetailsFromSessionStorage();
    this.getDriverDetailsFromSessionStorage();

  }

  getUserDetailsFromSessionStorage() {
    //Get user details from session storage
    this.id = sessionStorage.getItem('id') as string;
    this.email = sessionStorage.getItem('email') as string;
    this.password = sessionStorage.getItem('password') as string;
    this.personalTraitsOptions = this.databaseInterface.getPersonalTraitsOptions();
    this.hobbiesOptions = this.databaseInterface.getHobbiesOptions();
    this.genderOptions = this.databaseInterface.getGenderOptions();
    console.log(this.databaseInterface.retrieveAllUsers());
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

  saveUserDetails() {

    const updatedUserDetails = {
      // Assuming you have a way to generate or retrieve a unique user ID
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      courseDepartment: this.courseDepartment,
      personalTraits: this.selectedTraits,
      personalHobbies: this.selectedHobbies,
    };

    const updatedDriverDetails = {
      id: this.driver_id,
      licenseDateOfIssue: this.driver_licenseDateOfIssue,
      licenseDateOfExpiry: this.driver_licenseDateOfExpiry,
      licenseNumber: this.driver_licenseNumber,
      vehicleMake: this.driver_vehicleMake,
      vehicleModel: this.driver_vehicleModel,
    };
    

    //Regtister user to the database
    this.databaseInterface.addUserDetails(updatedUserDetails);

    //Register driver to the database
    this.databaseInterface.addDriverDetails(updatedDriverDetails);

  }

  goToHomePage() {
    if (this.name && this.gender && this.courseDepartment && this.dob) {
      if (this.selectedTraits.length <= 0 || this.selectedHobbies.length <= 0) {
        alert('Please make sure that you have at least one trait and one hobby selected.');
      } else {
        alert('Success!');
        this.saveUserDetails();
        //Clear session storage upon successful registration
        sessionStorage.clear();
        this.router.navigate(['/home']);
      }
    } else {
      alert('Please enter valid credentials.');
    }
  }

  goToApplyForDriverPage() {
    this.router.navigate(['/driver-details']);
  }

}
