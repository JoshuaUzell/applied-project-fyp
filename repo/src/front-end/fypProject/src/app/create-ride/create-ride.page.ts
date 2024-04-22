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
export class CreateRidePage {
  ride: IRide;

  //Ride fields
  id: string;
  numberOfSeats: number;
  direction: string;
  meetUpLocation: string;
  dropOffLocation: string;

  //Options for directions and meetup locations
  directions: string[] = ['To Campus', 'From Campus']; 
  meetUpLocations: string[] = ['Front Entrance', 'Nothern Entrance', 'Southern Entrance', 'West Entrance'];  // Example locations
  

  constructor(private alertController: AlertController, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface, private router: Router) {}

  async confirmNewRide() {
    const alert = await this.alertController.create({
      header: 'Confirm New Ride',
      message: `Are you sure you want to create a ride with the following info?\nNumber of Seats: ${this.numberOfSeats},\nDirection: ${this.direction}, \nMeetUpLocation ${this.meetUpLocation}?`,
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
            this.createRide();
          }
        }
      ]
    });
    await alert.present();
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
    this.databaseInterface.cancelRide(this.id, this.direction); //May need to alter arguements in this method call
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

  async createRide() {
    //Need logic here to create the ride..
    this.databaseInterface.addRide(this.ride);
    this.showProgressBar();

    console.log('Ride created:', this.numberOfSeats, this.direction, this.meetUpLocation);
  }

  showProgressBar() {
    // Logic to display a progress bar indicating the search for riders
  }

}
