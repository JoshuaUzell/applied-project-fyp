import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPasswordHandler } from '../passwordHandler.interface';
import { PASSWORD_HANDLER_TOKEN } from '../password-handler.service';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.page.html',
  styleUrls: ['./driver-details.page.scss'],
})
export class DriverDetailsPage implements OnInit {

  unapplyVisible: boolean = false;
  driverId: string = "";
  licenseDateOfIssue: string = "";
  licenseDateOfExpiry: string = "";
  licenseNumber: string = "";
  make: string = "";
  model: string = "";
  
  currentUser: any;
  currentDriver: any;

  constructor(private router: Router, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, @Inject(PASSWORD_HANDLER_TOKEN) private passwordHandler: IPasswordHandler) {
  }

  ngOnInit() {
    //Retrieve the current user to access the user email and get the currentDriver
    this.currentUser = this.databaseInterface.getCurrentUser();
    this.currentDriver = this.databaseInterface.getCurrentDriver();

    this.unapplyVisible = false;
    this.getDriverDetailsFromSessionStorage();
    if (this.driverId) {
      this.unapplyVisible = true;
    } else {
      this.unapplyVisible = false;
    }
  }

  applyForDriver() {
    if (this.licenseDateOfIssue && this.licenseDateOfExpiry && this.licenseNumber && this.make && this.model) {

      // Check if the license number is valid
      if (!this.databaseInterface.isLicenseNumberValid(this.licenseNumber)) {
        alert('Please enter a valid license number.');
        return;
      }

      //Check if the issue and expiry dates are the same
      if(!this.databaseInterface.validateDatesAreNotEqual(this.licenseDateOfIssue, this.licenseDateOfExpiry)) {
        alert('Issue and expiry dates cannot be the same. Please enter valid dates.');
        return;
      }

      //Check if the expiry date is today or prior to today
      if(!this.databaseInterface.validateExpiryDateIsNotPresentOrPriorDate(this.licenseDateOfExpiry)) {
        alert('The expiry date cannot be today or any date before today. Please enter valid dates.');
        return;
      }

      //Check if the expiry date is before the issue date
      if(!this.databaseInterface.validateExpiryAfterIssue(this.licenseDateOfIssue, this.licenseDateOfExpiry)) {
        alert('Expiry date cannot be before the issue date. Please enter valid dates.');
        return;
      }

      // Generate a unique ID for the new driver
      this.driverId = `driver_${this.databaseInterface.generateUniqueID()}`;

      // Store the driver details in session storage
      sessionStorage.setItem('driver-id', this.driverId);
      sessionStorage.setItem('license-date-of-issue', this.licenseDateOfIssue);
      sessionStorage.setItem('license-date-of-expiry', this.licenseDateOfExpiry);
      sessionStorage.setItem('license-number', this.licenseNumber);
      sessionStorage.setItem('make', this.make);
      sessionStorage.setItem('model', this.model);

      //Apply for Driver here
      this.saveDriverDetails();

      alert("Applied for Driver!"); // Display an alert with driver details

      this.router.navigate(['/profile']);
    } else {
      alert('Please enter valid credentials.');
    }
  }

  getDriverDetailsFromSessionStorage() {
    //Get driver details from session storage
    this.driverId = sessionStorage.getItem('driver-id') as string;
    this.licenseDateOfIssue = sessionStorage.getItem('license-date-of-issue') as string;
    this.licenseDateOfExpiry = sessionStorage.getItem('license-date-of-expiry') as string;
    this.licenseNumber = sessionStorage.getItem('license-number') as string;
    this.make = sessionStorage.getItem('make') as string;
    this.model = sessionStorage.getItem('model') as string;
  }

  saveDriverDetails() {
    const updatedDriverDetails = {
      id: this.driverId,
      driverEmail: this.currentUser.email, //Make the user email the same as the driver email
      licenseDateOfIssue: this.licenseDateOfIssue,
      licenseDateOfExpiry: this.licenseDateOfExpiry,
      licenseNumber: this.licenseNumber,
      vehicleMake: this.make,
      vehicleModel: this.model,
    };

    // Check if any property in updatedDriverDetails is null
    const isUpdatedDriversNull = Object.values(updatedDriverDetails).some(value => value === null);

    if (isUpdatedDriversNull) {
      console.log('At least one attribute is null. Therefore, driver will not be added to the database.');
    } else {
      if(this.currentDriver){
        this.databaseInterface.updateCurrentDriverDetails(updatedDriverDetails);
      }else{
        console.log('No attributes are null. Driver will get added to the database.');
        //Register driver to the database
        this.databaseInterface.addDriverDetails(updatedDriverDetails);
      }
    }
  }

  unApplyForDriver() {
    // Remove each item related to the driver from session storage
    sessionStorage.removeItem('driver-id');
    sessionStorage.removeItem('license-date-of-issue');
    sessionStorage.removeItem('license-date-of-expiry');
    sessionStorage.removeItem('license-number');
    sessionStorage.removeItem('make');
    sessionStorage.removeItem('model');

    //Resets the input boxes to be empty
    this.driverId = "";
    this.licenseDateOfIssue = "";
    this.licenseDateOfExpiry = "";
    this.licenseNumber = "";
    this.make = "";
    this.model = "";

    //Make the unapply button dissapear
    this.unapplyVisible = false;

    //Remove the driver from the database
    this.databaseInterface.removeCurrentDriver();

    alert("You have unapplied from being a driver!");
    this.router.navigate(['/profile']);
  }

}


