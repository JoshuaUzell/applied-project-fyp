import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplyBtnService {
  private buttonText = new BehaviorSubject('Apply for Driver');
  private unapplyVisible = new BehaviorSubject(false);
  
  currentButtonText = this.buttonText.asObservable();
  currentUnapplyVisible = this.unapplyVisible.asObservable();

  constructor() { }

  changeButtonText(text: string) {
    this.buttonText.next(text);
  }

  adjustUnapplyBtnVisibility(visible: boolean) {
    this.unapplyVisible.next(visible);
  }
}
