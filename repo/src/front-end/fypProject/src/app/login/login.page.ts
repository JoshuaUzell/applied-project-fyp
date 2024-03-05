import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'; // Adjust the path as necessary


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private dataService: DataService) {}

  //NOTE TO SELF: NEED TO CHECK IF EMAIL AND PASSWORD ARE THE SAME AS THE ONES IN THE DATABASE
  login() {
    if(this.email && this.password) {
      this.router.navigate(['/home']);
    } else {
      alert('Please enter valid credentials.');
    }
  }

  //Loads data from the backend
  loadData() {
    // NOTE TO SELF: NEED PROPER API FROM JOSE
    const apiUrl = 'http://yourbackendendpoint/api/data'; 
    this.dataService.getData(apiUrl).subscribe(data => {
      console.log(data);
      // Handle your data here
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
