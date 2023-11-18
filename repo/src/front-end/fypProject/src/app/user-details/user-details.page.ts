import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  name:string = '';
  age: string = '';
  gender: string = '';
  birthday: string = '';
  phoneNumber: string = '';


  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHomePage() {
    alert('Success!');
    //Insert home page here
  }

  goToApplyForDriverPage() {
    alert('Success!');
    //Insert applyForDriver here
  }

}
