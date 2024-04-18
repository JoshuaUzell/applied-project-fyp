import { IDriverDetails, IUserInfo } from "./database.interface";
import { IDatabaseInterface } from "./database.interface";
import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export const DATABASE_SERVICE_TOKEN = new InjectionToken<IDatabaseInterface>('DATABASE_SERVICE');


@Injectable({
    providedIn: 'root' // A singleton instance of this class is created and injected
})

export class MockDatabaseService implements IDatabaseInterface {
    private users: IUserInfo[] = [];
    private drivers: IDriverDetails[] = [];
    private currentUserEmail: string | null = null;

    constructor() {
        this.loadFromStorage();
        this.loadCurrentUserEmail();
    }

    private loadFromStorage(): void {
        const storedUsers = localStorage.getItem('users');
        const storedDrivers = localStorage.getItem('drivers');
        this.users = storedUsers ? JSON.parse(storedUsers) : [];
        this.drivers = storedDrivers ? JSON.parse(storedDrivers) : [];
    }

    private saveToStorage(): void {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('drivers', JSON.stringify(this.drivers));
    }

    private loadCurrentUserEmail(): void {
        const email = localStorage.getItem('currentUserEmail');
        if (email) {
            this.currentUserEmail = email;
        }
    }

    refreshData(): void {
        this.loadFromStorage();
    }

    addUserDetails(userInfo: IUserInfo): void {
        this.users.push(userInfo); // Add the new user to the list of users
        this.saveToStorage(); // Save the updated list of users to local storage
    }

    retrieveUserDetails(email: string): IUserInfo | undefined {
        return this.users.find(user => user.email === email);
    }

    addDriverDetails(driverDetails: IDriverDetails): void {
        this.drivers.push(driverDetails);
        this.saveToStorage();
    }

    retrieveDriverDetails(driverId: string): IDriverDetails | undefined {
        return this.drivers.find(driver => driver.id === driverId);
    }

    retrieveListOfDrivers(): IDriverDetails[] {
        return this.drivers;
    }


    //Returns all users
    retrieveAllUsers(): IUserInfo[] {
        return this.users;
    }

    clearData(): void {
        // Clear data from localStorage
        localStorage.removeItem('users');
        localStorage.removeItem('drivers');

        // Confirm data has been cleared
        console.log('All data cleared from database');
    }

    emailExists(email: string): boolean {
        return this.users.some(user => user.email === email);
    }

    // Method to return a list of genders
    getGenderOptions(): string[] {
        return ['Male', 'Female', 'Other', 'Prefer not to say'];
    }

    // Method to return a list of personal traits with matched value and display names
    getPersonalTraitsOptions(): Array<{ value: string, display: string }> {
        return [
            { value: "Adventurous", display: "Adventurous" },
            { value: "Curious", display: "Curious" },
            { value: "Empathetic", display: "Empathetic" },
            { value: "Friendly", display: "Friendly" },
            { value: "Shy", display: "Shy" }
        ];
    }

    // Method to return a list of hobbies with matched value and display names
    getHobbiesOptions(): Array<{ value: string, display: string }> {
        return [
            { value: "Reading", display: "Reading" },
            { value: "Drawing", display: "Drawing" },
            { value: "Painting", display: "Painting" },
            { value: "Music", display: "Music" },
            { value: "Cooking", display: "Cooking" }
        ];
    }

    setCurrentUserEmail(email: string): void {
        this.currentUserEmail = email;
        localStorage.setItem('currentUserEmail', email); // Save the current user email to localStorage
    }

    getCurrentUser(): IUserInfo | undefined {
        if (!this.currentUserEmail) {
            console.log("No current user email set.");
            return undefined;
        }
        return this.users.find(user => user.email === this.currentUserEmail);
    }

    updateCurrentUserDetails(updatedDetails: Partial<IUserInfo>): void {
        if (!this.currentUserEmail) {
            console.error("No current user email set. Unable to update user details.");
            return;
        }
        const userIndex = this.users.findIndex(user => user.email === this.currentUserEmail);
        if (userIndex !== -1) {
            // Assuming you want to fully replace personalTraits and personalHobbies arrays
            // and update other fields directly
            const currentUser = this.users[userIndex];
            this.users[userIndex] = {
                ...currentUser,
                ...updatedDetails,
                // Directly replace arrays. If you wanted to merge them instead, additional logic would be needed
                personalTraits: updatedDetails.personalTraits ? [...updatedDetails.personalTraits] : currentUser.personalTraits,
                personalHobbies: updatedDetails.personalHobbies ? [...updatedDetails.personalHobbies] : currentUser.personalHobbies
            };
            this.saveToStorage(); // Persist the updated user list to storage
            console.log("User details updated successfully.");
        } else {
            console.error("Current user not found. Unable to update user details.");
        }
    }

    generateUniqueID(): string {
        return uuidv4();
    }

    isLicenseNumberValid(licenseNumber: string): boolean {
        const regex = /^[A-Z0-9]{10}$/;
        return regex.test(licenseNumber);
    }

    // Function to check if the dates are equal
    validateDatesAreNotEqual(issueDate: string, expiryDate: string): boolean {
        if (issueDate === expiryDate) {
            console.error('Issue and expiry dates cannot be the same.');
            return false;
        }
        return true;
    }

    validateExpiryDateIsNotPresentOrPriorDate(expiryDate: string): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for a fair comparison

        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0); // Ensure the comparison is date-only, without time

        if ((expiry.getTime() < today.getTime()) || (expiry.getTime() === today.getTime())) {
            console.error('The expiry date cannot be today or any date before today.');
            return false;
        }

        return true;
    }

    validateExpiryAfterIssue(issueDate: string, expiryDate: string): boolean {
        const issue = new Date(issueDate);
        const expiry = new Date(expiryDate);

        if (expiry <= issue) {
            console.error('The expiry date cannot be before the issue date.');
            return false; // Validation failed
        }
        return true; // Validation passed
    }

    getCurrentDriver(): IDriverDetails | undefined {
        if (!this.currentUserEmail) {
            console.error("No current driver email is set.");
            return undefined;
        }
        return this.drivers.find(driver => driver.driverEmail === this.currentUserEmail);
    }

    removeCurrentDriver(): void {
        //Check that's done as an edge case
        if (!this.currentUserEmail) {
            console.error("No current driver email is set. Unable to remove driver.");
            return;
        }

        const driverIndex = this.drivers.findIndex(driver => driver.driverEmail === this.currentUserEmail);
        if (driverIndex !== -1) {
            this.drivers.splice(driverIndex, 1); // Remove the driver from the array
            this.saveToStorage(); // Save the updated list of drivers to local storage
            console.log("Driver removed successfully.");
        } else {
            console.error("Current driver not found. Unable to remove driver.");
        }
    }

    updateCurrentDriverDetails(updatedDetails: Partial<IUserInfo>): void {
        if (!this.currentUserEmail) {
            console.error("No current user email set. Unable to update driver details.");
            return;
        }
        const driverIndex = this.drivers.findIndex(driver => driver.driverEmail === this.currentUserEmail);
        if (driverIndex !== -1) {
            // Merge the existing driver details with the updated details
            const currentDriver = this.drivers[driverIndex];
            this.drivers[driverIndex] = {
                ...currentDriver,
                ...updatedDetails
            };

            this.saveToStorage(); // Save the updated list of drivers to local storage
            console.log("Driver details updated successfully.");

        } else {
            console.error("Current driver not found. Unable to update driver details.");
        }
    }


}//End of class