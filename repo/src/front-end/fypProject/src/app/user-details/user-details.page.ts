import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IDatabaseInterface } from '../database.interface';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})

export class UserDetailsPage implements OnInit {
  applyForDriverText: string = 'Apply for Driver';

  //User Details from html form
  imagePreview: string | ArrayBuffer | null = null;
  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  dob: string = '';
  courseDepartment: string = '';
  personalTraits: any[] = [];
  personalHobbies: any[] = [];

  //Options that the user can choose from
  personalTraitsOptions: Array<{ value: string, display: string }> = [];
  hobbiesOptions: Array<{ value: string, display: string }> = [];
  genderOptions: string[] = [];


  constructor(private router: Router, private alertController: AlertController, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) {
  }

  ngOnInit() {
    //this.databaseInterface.clearData();
    this.retrieveRegistrationDetailsFromSessionStorage();
    this.retrieveOptionsToChooseFrom();
  }

  retrieveOptionsToChooseFrom() {
    //Retrieve the gender options, personal traits options, and hobbies options from the database
    this.genderOptions = this.databaseInterface.getGenderOptions();
    this.personalTraitsOptions = this.databaseInterface.getPersonalTraitsOptions();
    this.hobbiesOptions = this.databaseInterface.getHobbiesOptions();
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          this.imagePreview = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  retrieveRegistrationDetailsFromSessionStorage() {
    //Retrieve the registration details from session storage
    this.id = sessionStorage.getItem('id') as string;
    this.email = sessionStorage.getItem('email') as string;
    this.password = sessionStorage.getItem('password') as string; 
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

  saveUserDetails() {
    const updatedUserDetails = {
      image: this.imagePreview,
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      courseDepartment: this.courseDepartment,
      personalTraits: this.personalTraits,
      personalHobbies: this.personalHobbies,
    };

    //Regtister user to the database
    this.databaseInterface.addUserDetails(updatedUserDetails);

    //Refresh the data
    this.databaseInterface.refreshData();
  }

  //Being called in html file
  goToHomePage() {
    if (this.name && this.gender && this.courseDepartment && this.dob) {
      if (this.personalTraits.length <= 0 || this.personalHobbies.length <= 0) {
        alert('Please make sure that you have at least one trait and one hobby selected.');
      } else {
        alert('Success!');

        this.saveUserDetails();

        this.databaseInterface.setCurrentUserEmail(this.email);

        this.router.navigate(['/home']);
      }
    } else {
      alert('Please enter valid credentials.');
    }
  }


}
