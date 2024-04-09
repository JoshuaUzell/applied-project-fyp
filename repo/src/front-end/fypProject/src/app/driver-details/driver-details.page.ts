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

  constructor(private router: Router, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, @Inject(PASSWORD_HANDLER_TOKEN) private passwordHandler: IPasswordHandler) {
  }

  ngOnInit() {
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

      // Generate a unique ID for the new driver
      this.driverId = `driver_${this.databaseInterface.generateUniqueID()}`;

      // Store the driver details in session storage
      sessionStorage.setItem('driver-id', this.driverId);
      sessionStorage.setItem('license-date-of-issue', this.licenseDateOfIssue);
      sessionStorage.setItem('license-date-of-expiry', this.licenseDateOfExpiry);
      sessionStorage.setItem('license-number', this.licenseNumber);
      sessionStorage.setItem('make', this.make);
      sessionStorage.setItem('model', this.model);

      alert("Applied for Driver!"); // Display an alert with driver details

      this.router.navigate(['/user-details']);
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

    alert("You have unapplied from being a driver!");
    this.router.navigate(['/user-details']);
  }

}


