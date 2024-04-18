import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
})
export class CreateRidePage {

  availableSpaces: number;
  direction: string;
  location: string;
  directions: string[] = ['To Campus', 'From Campus']; 
  locations: string[] = ['Campus Entrance', 'Library', 'Sports Complex', 'Administration Block'];  // Example locations

  constructor(private alertController: AlertController) {}

  async confirmRide() {
    const alert = await this.alertController.create({
      header: 'Confirm New Ride',
      message: `Are you sure you want to create a ride with ${this.availableSpaces} spaces, going ${this.direction} to ${this.location}?`,
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

    console.log('Ride created:', this.availableSpaces, this.direction, this.location);
  }

}
