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
  
  makeHomepageContentsVisible = true;
  makeInwardRideTitlesVisible = false;

  inwardRides: any[] = [];

  constructor(private router: Router, @Inject(DATABASE_SERVICE_TOKEN) private databaseInterface: IDatabaseInterface) {}

  ngOnInit(): void {
    //this.databaseInterface.clearData();
    //Refresh data
    this.databaseInterface.refreshData();
    this.printSessionStorageAndDatabaseDetails();
  }

  printSessionStorageAndDatabaseDetails(){
    console.log('Session Storage: ' + sessionStorage.getItem('id') + ' ' + sessionStorage.getItem('email') + ' ' + sessionStorage.getItem('password'));
    console.log('Session Storage for driver: ' + sessionStorage.getItem('driver-id') + ' ');
    console.log(this.databaseInterface.retrieveAllUsers());
    console.log(this.databaseInterface.retrieveListOfDrivers());
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  displayInwardRides(){  
      this.makeInwardRideTitlesVisible = true;
      this.makeHomepageContentsVisible = false;
      this.inwardRides = this.databaseInterface.getRides('To Campus');
      console.log('Inwards Rides:', this.inwardRides);
  }

}
