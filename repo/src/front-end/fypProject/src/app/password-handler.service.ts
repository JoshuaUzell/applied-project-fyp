import { Injectable } from '@angular/core';
import { IPasswordHandler } from './passwordHandler.interface'; 
import * as bcrypt from 'bcryptjs';
import { InjectionToken } from '@angular/core';

export const PASSWORD_HANDLER_TOKEN = new InjectionToken<IPasswordHandler>('PASSWORD_HANDLER');


@Injectable({
  providedIn: 'root'
})

export class PasswordHandlerService implements IPasswordHandler {

  constructor() { }
 
  //Hashes the password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Generates a salt
    const hash = await bcrypt.hash(password, salt); // Hash the password with the salt included
    return hash;
  }

  //Verifies that the password matches the hash
  verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  checkPasswordAndConfirmPasswordMatch(password: string, confirmPassword: string): boolean {
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
