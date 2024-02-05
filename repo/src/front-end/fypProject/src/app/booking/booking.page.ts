import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
 

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor(public alertController: AlertController, public navController: NavController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Booking Successful!',
      message: 'You have successfully booked a ride with this driver.',
      buttons: ['OK']
    });

    await alert.present();
    this.navController.navigateBack('/home');
  }

}
