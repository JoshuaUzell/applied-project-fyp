import { Component, Inject, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IDatabaseInterface, IRide } from '../database.interface';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
})
export class CreateRidePage implements OnInit{
  
  //Boolean
  makeCreateRideButtonVisible: boolean = true;
  makeCancelRideButtonVisible: boolean = false;
  makeRideStatusVisible: boolean = false;
  @Input() hasActiveStatus: boolean = false; // Input to determine if the ride is active or not
  makeLookingForRiderProgressVisible: boolean = false;
  disableInputButton: boolean = false;

  //Ride object
  ride: IRide;

  //Ride fields
  rideEmail: string;
  numberOfSeats: number;
  direction: string;
  locationAtCollege: string;
  locationOutsideOfCollege: string;

  //Options for directions and meetup locations
  directions: string[] = ['To Campus', 'From Campus'];
  locationsAtCollege: string[] = ['Front Entrance', 'Nothern Entrance', 'Southern Entrance', 'West Entrance'];  // Example locations
  locationsOutsideOfCollege: string; 

  currentRide: any;

  ngOnInit(): void {
    //Clear rides data for testing purposes
    //this.databaseInterface.clearRidesData();

    //Refresh data
    this.databaseInterface.refreshData();
    
    //Load boolean values
    this.loadBooleanValuesFromDatabase();

    //Retrieve the currentRide
    this.currentRide = this.databaseInterface.getCurrentRide();

    //Assign the currentRide details to the fields
    if(this.currentRide){
      this.assignCurrentRideValuesToFormFields();
    }

    this.printListOfRidesToConsole();
  }

  constructor(private alertController: AlertController, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, private router: Router) { }

  loadBooleanValuesFromDatabase() {
    const booleanSettings = this.databaseInterface.getBooleanLogicForCreateRideButtons();
    this.makeCreateRideButtonVisible = booleanSettings.createRideBool;
    this.makeCancelRideButtonVisible = booleanSettings.cancelRideBool;
    this.makeRideStatusVisible = booleanSettings.statusBool;
    this.hasActiveStatus = booleanSettings.activeStatusBool;
    this.makeLookingForRiderProgressVisible = booleanSettings.progressBool;
    this.disableInputButton = booleanSettings.disableInputButtonBool;
  }

  setBooleanValuesInDatabase(makeCreateRideButtonVisible: boolean, makeCancelRideButtonVisible: boolean, makeRideStatusVisible: boolean, hasActiveStatus: boolean,
     makeLookingForRiderProgressVisible: boolean, disableInputButton: boolean) {
    this.makeCreateRideButtonVisible = makeCreateRideButtonVisible;
    this.makeCancelRideButtonVisible = makeCancelRideButtonVisible;
    this.makeRideStatusVisible = makeRideStatusVisible;
    this.hasActiveStatus = hasActiveStatus;
    this.makeLookingForRiderProgressVisible = makeLookingForRiderProgressVisible;
    this.disableInputButton = disableInputButton;
    this.databaseInterface.setBooleanLogicForCreateRideButtons(this.makeCreateRideButtonVisible, this.makeCancelRideButtonVisible, this.makeRideStatusVisible, this.hasActiveStatus, this.makeLookingForRiderProgressVisible, this.disableInputButton);
  }

  assignFormFieldsToBeEmpty(){
    this.numberOfSeats = 0;
    this.direction = '';
    this.locationAtCollege = '';
    this.locationOutsideOfCollege = '';
  }


  async confirmNewRide() {
    const alert = await this.alertController.create({
      header: 'Confirm New Ride',
      message: `Are you sure you want to create a ride with the following info?\nNumber of Seats: ${this.numberOfSeats},\nDirection: ${this.direction}, 
      \nLocation At College: ${this.locationAtCollege}\nLocation Outside College: ${this.locationOutsideOfCollege}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Ride creation cancelled');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.assignRideFieldsToCurrentRide();
            this.databaseInterface.addRide(this.ride);
            this.setBooleanValuesInDatabase(false, true, true, false, true, true);
            this.printListOfRidesToConsole();
          }
        }
      ]
    });
    await alert.present();
  }

  printListOfRidesToConsole(){
    console.log('List of Rides from college:')
    console.log(this.databaseInterface.retrieveListOfRidesFromCollege());
    console.log('List of Rides to college:')
    console.log(this.databaseInterface.retrieveListOfRidesToCollege());
  }

  async confirmCancelRide() {
    const alert = await this.alertController.create({
      header: 'Confirm Cancellation',
      message: 'Are you sure you want to cancel this ride?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.cancelRide();
          }
        }
      ]
    });
    await alert.present();
  }

  
  async cancelRide() {
    this.setBooleanValuesInDatabase(true, false, false, false, false, false);
    this.databaseInterface.cancelRide(this.rideEmail, this.direction);
    this.assignFormFieldsToBeEmpty();
  }

  async confirmLeavePage() {
    const alert = await this.alertController.create({
      header: 'Leave Page?',
      message: 'If you leave, any created rides will be canceled. Continue?',
      buttons: [
        {
          text: 'Stay',
          role: 'cancel'
        },
        {
          text: 'Leave',
          handler: () => {
            this.cancelRide();
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  assignCurrentRideValuesToFormFields(){
    this.rideEmail = this.currentRide.rideEmail;
    this.numberOfSeats = this.currentRide.numberOfSeats;
    this.direction = this.currentRide.direction;
    this.locationAtCollege = this.currentRide.locationAtCollege;
    this.locationOutsideOfCollege = this.currentRide.locationOutsideOfCollege;
  }

  assignRideFieldsToCurrentRide() {
    this.ride = {
      rideEmail: this.databaseInterface.getCurrentUserEmail() as string ?? '',
      status: 'active',
      numberOfSeats: this.numberOfSeats,
      direction: this.direction,
      locationAtCollege: this.locationAtCollege,
      locationOutsideOfCollege: this.locationOutsideOfCollege
    }
    alert('Ride created successfully');
  }

  showRideDetailsIfPresent(){
    if(this.rideEmail){
      this.numberOfSeats = this.ride.numberOfSeats;
      this.locationAtCollege = this.ride.locationAtCollege;
      this.locationOutsideOfCollege = this.ride.locationOutsideOfCollege;
    }
  }

  async createRide() {
    if (this.numberOfSeats && this.direction && this.locationAtCollege && this.locationOutsideOfCollege) {
      this.confirmNewRide();
    } else {
      alert('Please fill in all fields');
    }
  }



}
