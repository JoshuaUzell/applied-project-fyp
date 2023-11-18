import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.page.html',
  styleUrls: ['./driver-details.page.scss'],
})
export class DriverDetailsPage implements OnInit {
  licenseNumber:string = "";
  licenseExpiryDate:string = "";
  vehicleInfo:string = "";
  proofOfInsurance:string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  applyForDriver(){
    if(this.licenseNumber && this.licenseExpiryDate 
      && this.vehicleInfo && this.proofOfInsurance) {
      alert("Applied for Driver");
      //Need a page similar to user-details but a second version where the 
      //applyForDriver button is now EditDriverDetails
    } else {
      alert('Please enter valid credentials.');
    }
    
  }

}
