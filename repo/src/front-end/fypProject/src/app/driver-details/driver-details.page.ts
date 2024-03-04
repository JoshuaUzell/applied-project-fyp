import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyBtnService } from '../apply-btn.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.page.html',
  styleUrls: ['./driver-details.page.scss'],
})
export class DriverDetailsPage implements OnInit {
  actualApplyForDriverBtn: string = 'Apply';
  unapplyVisible: boolean = false;
  licenseDateOfIssue:string = "";
  licenseDateOfExpiry:string = "";
  licenseNumber:string = "";
  make:string = "";
  model:string = "";

  constructor(private router: Router, private applyBtnService: ApplyBtnService) { 
    this.applyBtnService.currentUnapplyVisible.subscribe(visible => this.unapplyVisible = visible);
  }

  ngOnInit() {
  }

  applyForDriver(){
    if(this.licenseDateOfIssue && this.licenseDateOfExpiry && this.licenseNumber && this.make && this.model) {
      alert("Applied for Driver!");
      //this.actualApplyForDriverBtn = 'Cancel Driver Application';
      this.applyBtnService.changeButtonText('Edit Driver Application');
      this.applyBtnService.adjustUnapplyBtnVisibility(true);
      this.router.navigate(['/user-details']);
    } else {
      alert('Please enter valid credentials.');
    }
  }

  unApplyForDriver() {
    // Reset the button text
    this.applyBtnService.changeButtonText('Apply for Driver');
    // Hide the "Unapply" button
    this.applyBtnService.adjustUnapplyBtnVisibility(false);
    alert("You have unapplied from being a driver!");
    this.router.navigate(['/user-details']);
  }

}


