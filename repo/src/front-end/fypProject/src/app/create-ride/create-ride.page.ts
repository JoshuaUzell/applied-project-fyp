import { Component, Inject, OnInit } from '@angular/core';
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
    //Refresh data
    this.databaseInterface.refreshData();

    //Retrieve the currentRide
    this.currentRide = this.databaseInterface.getCurrentRide();

    //Assign the currentRide details to the fields
    if(this.currentRide){
      this.assignCurrentRideValuesToFormFields();
    }

    this.printListOfRidesToConsole();
  }

  constructor(private alertController: AlertController, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, private router: Router) { }

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
            this.showProgressBar();
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

  //Update current ride details
  updateCurrentRide(){
    this.databaseInterface.updateRideDetails(this.rideEmail, this.direction, this.ride);
  }

  async cancelRide() {
    this.databaseInterface.cancelRide(this.rideEmail, this.direction); //May need to alter arguements in this method call
    this.router.navigateByUrl('/home');
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

  showProgressBar() {
    // Logic to display a progress bar indicating the search for riders
  }

}
