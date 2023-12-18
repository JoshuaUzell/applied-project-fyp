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
  email: string = '';
  gender: string = '';
  birthday: string = '';
  courseDepartment: string = '';


  constructor(private router: Router, private applyBtnService: ApplyBtnService) { 
  }

  ngOnInit() {
    this.applyBtnService.currentButtonText.subscribe(text => this.applyForDriverText = text);  
  }

  goToHomePage() {
    if(this.name && this.email && this.gender && this.courseDepartment) {
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
