import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  

  
  ////////////////////////
  ////OLD CODE BELOW//////
  ///////////////////////

  // showInwardRides = false;
  // showOutwardRides = false;
  
  // inwardRides = [
  //   { name: 'Mary R.', from: 'Athenry, G', availableSpace: '3/3', image: 'assets/images/woman-1.jpg'},
  //   { name: 'Alfred T.', from: 'Ballinasloe, G', availableSpace: '0/1', image: 'assets/images/man-glasses.jpg'},
  //   { name: 'Matilda S.', from: 'Barna, G', availableSpace: '1/4', image: 'assets/images/woman-2.jpg'},
  //   { name: 'Dora D.', from: 'Clifden, G', availableSpace: '2/2', image: 'assets/images/woman-3.jpg'},
  // ];

  // outwardRides = [
  //   { name: 'Johnny R.', from: 'Lettermore, G', availableSpace: '2/3', image: 'assets/images/man-1.jpg'},
  //   { name: 'Michael T.', from: 'Kinvara, G', availableSpace: '1/1', image: 'assets/images/man-2.jpg'},
  //   { name: 'Sarah W.', from: 'Loughrea, G', availableSpace: '3/3', image: 'assets/images/woman-4.jpg'},
  //   { name: 'Rose W.', from: 'Oranmore, G', availableSpace: '2/4', image: 'assets/images/woman-5.jpg'},
  // ];
  constructor(private router: Router, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) {}

  ngOnInit(): void {
    console.log(this.databaseInterface.retrieveAllUsers());
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

}
