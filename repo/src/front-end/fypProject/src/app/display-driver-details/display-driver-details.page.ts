import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-driver-details',
  templateUrl: './display-driver-details.page.html',
  styleUrls: ['./display-driver-details.page.scss'],
})
export class DisplayDriverDetailsPage implements OnInit {

  unapplyVisible: boolean = false;
  driverId: string = "";
  licenseDateOfIssue: string = "";
  licenseDateOfExpiry: string = "";
  licenseNumber: string = "";
  make: string = "";
  model: string = "";

  constructor() { }

  ngOnInit() {
  }

}
