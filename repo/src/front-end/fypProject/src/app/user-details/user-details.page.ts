import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyBtnService } from '../apply-btn.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  applyForDriverText: string = 'Apply for Driver';
  selectedTraits: any[]=[];
  selectedHobbies: any[]=[];
  
  name:string = '';
  gender: string = '';
  dob: string = '';
  courseDepartment: string = '';


  constructor(private router: Router, private applyBtnService: ApplyBtnService, private alertController: AlertController) { 
  }

  ngOnInit() {
    this.applyBtnService.currentButtonText.subscribe(text => this.applyForDriverText = text);  
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


  goToHomePage() {
    if(this.name && this.gender && this.courseDepartment && this.dob) {
        alert('Success!');
        this.router.navigate(['/home']);
      }else{
        alert('Please enter valid credentials.');
      }
  }

  goToApplyForDriverPage() {
    this.router.navigate(['/driver-details']);
  }

}
