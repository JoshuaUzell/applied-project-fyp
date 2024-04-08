import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyBtnService } from '../apply-btn.service';
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
  
  // Gender options which will contain options from the database
  genderOptions: string[] = [];

  id: string = '';
  name:string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  dob: string = '';
  courseDepartment: string = '';
  selectedTraits: any[]=[];
  selectedHobbies: any[]=[];
  personalTraitsOptions: Array<{value: string, display: string}> = [];
  hobbiesOptions: Array<{value: string, display: string}> = [];
 
  constructor(private router: Router, private applyBtnService: ApplyBtnService, private alertController: AlertController
    ,@Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) { 
  }

  ngOnInit() {
    //this.databaseInterface.clearData();
    console.log('Session Storage: ' + sessionStorage.getItem('id') + ' ' + sessionStorage.getItem('email') + ' ' + sessionStorage.getItem('password'));
    this.id = sessionStorage.getItem('id') as string;
    this.email = sessionStorage.getItem('email') as string;
    this.password = sessionStorage.getItem('password') as string;
    this.personalTraitsOptions = this.databaseInterface.getPersonalTraitsOptions();
    this.hobbiesOptions = this.databaseInterface.getHobbiesOptions();
    this.genderOptions = this.databaseInterface.getGenderOptions();
    this.applyBtnService.currentButtonText.subscribe(text => this.applyForDriverText = text);  
    console.log(this.databaseInterface.retrieveAllUsers());
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
      this.selectedTraits = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.selectedTraits;
    } else {
      // If three or fewer selections, just update the model
      this.selectedTraits = event.detail.value;
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
      this.selectedHobbies = event.detail.value.slice(0, 3);
      // Reset the ion-select to only have the first three items
      event.target.value = this.selectedHobbies;
    } else {
      // If three or fewer selections, just update the model
      this.selectedHobbies = event.detail.value;
    }
  }

  saveUserDetails() {
    
    const updatedUserDetails = {
      // Assuming you have a way to generate or retrieve a unique user ID
      id: this.id,
      email: this.email, 
      password: this.password, 
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      courseDepartment: this.courseDepartment,
      personalTraits: this.selectedTraits,
      personalHobbies: this.selectedHobbies,
    };

    //Regtister user to the database
    this.databaseInterface.addUserDetails(updatedUserDetails);
    
    //Clear session storage upon successful registration
    sessionStorage.clear();
  }

  goToHomePage() {
    if(this.name && this.gender && this.courseDepartment && this.dob) {
        alert('Success!');
        this.saveUserDetails();
        this.router.navigate(['/home']);
      }else{
        alert('Please enter valid credentials.');
      }
  }

  goToApplyForDriverPage() {
    this.router.navigate(['/driver-details']);
  }

}
