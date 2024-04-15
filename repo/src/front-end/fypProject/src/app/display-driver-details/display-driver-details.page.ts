import { Component, Inject, OnInit } from '@angular/core';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';

@Component({
  selector: 'app-display-driver-details',
  templateUrl: './display-driver-details.page.html',
  styleUrls: ['./display-driver-details.page.scss'],
})
export class DisplayDriverDetailsPage implements OnInit {

  unapplyVisible: boolean = false;
  driverId: string = "";
  licenseDateOfIssue: string = "";
  licenseDateOfExpiry: string = "";
  licenseNumber: string = "";
  make: string = "";
  model: string = "";

  currentDriver: any;

  constructor(@Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) { }

  ngOnInit() {
    this.currentDriver = this.databaseInterface.getCurrentDriver();
    if(this.currentDriver){
      this.assignDriverDetails();
      this.unapplyVisible = true;
    }
  }

  assignDriverDetails() {
      this.driverId = this.currentDriver.id || '';
      this.licenseDateOfIssue = this.currentDriver.licenseDateOfIssue || '';
      this.licenseDateOfExpiry = this.currentDriver.licenseDateOfExpiry || '';
      this.licenseNumber = this.currentDriver.licenseNumber || '';
      this.make = this.currentDriver.vehicleMake || '';
      this.model = this.currentDriver.vehicleModel || '';
  }

}
