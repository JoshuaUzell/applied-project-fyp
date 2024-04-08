import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.page.html',
  styleUrls: ['./driver-details.page.scss'],
})
export class DriverDetailsPage implements OnInit {
  
  unapplyVisible: boolean = false;
  driverId:string = "";
  licenseDateOfIssue:string = "";
  licenseDateOfExpiry:string = "";
  licenseNumber:string = "";
  make:string = "";
  model:string = "";

  constructor(private router: Router) { 
  }

  ngOnInit() {
  }

  applyForDriver(){
    if(this.licenseDateOfIssue && this.licenseDateOfExpiry && this.licenseNumber && this.make && this.model) {
      // Store the driver details in session storage
      sessionStorage.setItem('driver-id', this.driverId);
      sessionStorage.setItem('license-date-of-issue', this.licenseDateOfIssue);
      sessionStorage.setItem('license-date-of-expiry', this.licenseDateOfExpiry);
      sessionStorage.setItem('license-number', this.licenseNumber);
      sessionStorage.setItem('make', this.make);
      sessionStorage.setItem('model', this.model);

      alert("Applied for Driver!"); // Display an alert with driver details
      
      this.router.navigate(['/user-details']);
    } else {
      alert('Please enter valid credentials.');
    }
  }

  unApplyForDriver() {
    alert("You have unapplied from being a driver!");
    this.router.navigate(['/user-details']);
  }

}


