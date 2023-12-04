import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ApplyBtnService } from '../apply-btn.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  applyForDriverText: string = 'Apply for Driver';

  name:string = '';
  age: string = '';
  gender: string = '';
  birthday: string = '';
  phoneNumber: string = '';


  constructor(private router: Router, private applyBtnService: ApplyBtnService) { 
  }

  ngOnInit() {
    this.applyBtnService.currentButtonText.subscribe(text => this.applyForDriverText = text);  
  }

  goToHomePage() {
    if(this.name && this.age && this.gender && this.birthday 
      && this.phoneNumber) {
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
