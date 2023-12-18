import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showInwardRides = false;
  inwardRides = [
    { name: 'Mary R.', from: 'Athenry, G', availableSpace: '3/3', image: 'assets/images/woman-1.jpg'},
    { name: 'Alfred T.', from: 'Ballinasloe, G', availableSpace: '0/1', image: 'assets/images/man-glasses.jpg'},
    { name: 'Matilda S.', from: 'Barna, G', availableSpace: '1/4', image: 'assets/images/woman-2.jpg'},
    { name: 'Dora D.', from: 'Clifden, G', availableSpace: '2/2', image: 'assets/images/woman-3.jpg'},
  ];
  constructor() {}

}
