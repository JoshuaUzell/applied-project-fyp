import { Injectable } from '@angular/core';
import { PasswordHandler } from './passwordHandler.interface'; // Fixed import statement
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

export class PasswordHandlerService implements PasswordHandler {

  constructor() { }

  //Hashes the passwod
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Generates a salt
    const hash = await bcrypt.hash(password, salt); // Hash the password with the salt included
    return hash;
  }

  verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  checkPasswordMatchForRegistration(password: string, confirmPassword: string): boolean {
    //Check if password and confirm password exist, if so, check if they match, if not, display an alert
    if (password && confirmPassword) {
      //Check if password and confirm password match
      if (password === confirmPassword) {
        // If credentials are valid, return true, else return false
        alert('Success! Passwords match.');
        return true;
      } else {
        alert('Passwords do not match. Please enter the same password in both fields.');
        return false;
      }
    } else {
      alert('Please enter all the password fields.');
      return false;
    }
  }
}
