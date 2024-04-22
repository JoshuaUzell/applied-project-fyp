import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
})
export class CreateRidePage {

  //Ride fields
  numberOfSeats: number;
  direction: string;
  meetUpLocation: string;
  dropOffLocation: string;

  //Options for directions and meetup locations
  directions: string[] = ['To Campus', 'From Campus']; 
  meetUpLocations: string[] = ['Front Entrance', 'Nothern Entrance', 'Southern Entrance', 'West Entrance'];  // Example locations
  

  constructor(private alertController: AlertController) {}

  async confirmRide() {
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

  createRide() {
    //Need logic here to create the ride..

    console.log('Ride created:', this.numberOfSeats, this.direction, this.meetUpLocation);
  }

}
