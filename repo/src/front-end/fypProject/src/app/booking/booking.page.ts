import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface, IRide } from '../database.interface';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  //User Details from html form
  //currentUserImage: string | ArrayBuffer | null = null;
  id: string = '';
  email: string = '';
  name: string = '';
  gender: string = '';
  dob: string = '';
  courseDepartment: string = '';
  personalTraits: any[] = [];
  personalHobbies: any[] = [];
  //The password is not displayed in the form for the profile page, but is obtained from the session storage
  password: string = '';

  //Options that the user can choose from
  personalTraitsOptions: Array<{ value: string, display: string }> = [];
  hobbiesOptions: Array<{ value: string, display: string }> = [];
  genderOptions: string[] = [];

  //Represents the current user
  //currentUser: any;
  currentDriver: any;

  bookedRide: IRide;

  //Driver details from html form
  driver_id: string = '';
  driver_licenseDateOfIssue: string = '';
  driver_licenseDateOfExpiry: string = '';
  driver_licenseNumber: string = '';
  driver_vehicleMake: string = '';
  driver_vehicleModel: string = '';

  disableInputButton: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) { }

  ngOnInit() {
    //Refresh data
    this.databaseInterface.refreshData();

    this.email = this.activatedRoute.snapshot.paramMap.get('rideEmail')!;

    this.bookedRide = this.databaseInterface.getBookedRide(this.email)!;

    this.retrieveOptionsToChooseFrom();

    //Assign the current booked ride values to the form fields
    this.assignCurrentBookedRideValuesToFormFields();
  }

  // onImageSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = e => {
  //       if (e.target) {
  //         this.currentUserImage = e.target.result;
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  assignCurrentBookedRideValuesToFormFields() {
    //Assign the current user values to the form fields
    this.email = this.bookedRide.rideEmail;
    this.name = this.bookedRide.driverName;
    this.gender = this.bookedRide.gender;
    this.dob = this.bookedRide.dob;
    this.courseDepartment = this.bookedRide.courseDepartment;
    this.personalTraits = this.bookedRide.personalTraits;
    this.personalHobbies = this.bookedRide.personalHobbies;
  }

  retrieveOptionsToChooseFrom() {
    //Retrieve the gender options, personal traits options, and hobbies options from the database
    this.genderOptions = this.databaseInterface.getGenderOptions();
    this.personalTraitsOptions = this.databaseInterface.getPersonalTraitsOptions();
    this.hobbiesOptions = this.databaseInterface.getHobbiesOptions();
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
      this.personalTraits = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.personalTraits;
    } else {
      // If three or fewer selections, just update the model
      this.personalTraits = event.detail.value;
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
      this.personalHobbies = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.personalHobbies;
    } else {
      // If three or fewer selections, just update the model
      this.personalHobbies = event.detail.value;
    }
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  applyForRide(){
    alert('Please wait as your ride is being processed...');
  }

}//End of class
