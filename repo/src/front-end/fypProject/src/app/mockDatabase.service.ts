import { IDriverDetails, IRide, IUserInfo } from "./database.interface";
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
    private ridesToCollege: IRide[] = [];
    private ridesFromCollege: IRide[] = [];

    private currentUserEmail: string | null = null;

    
    constructor() {
        this.loadFromStorage();
        this.loadCurrentUserEmail();
    }

    private loadFromStorage(): void {
        const storedUsers = localStorage.getItem('users');
        const storedDrivers = localStorage.getItem('drivers');
        const storedRidesToCollege = localStorage.getItem('ridesToCollege');
        const storedRidesFromCollege = localStorage.getItem('ridesFromCollege');
        this.users = storedUsers ? JSON.parse(storedUsers) : [];
        this.drivers = storedDrivers ? JSON.parse(storedDrivers) : [];
        this.ridesToCollege = storedRidesToCollege ? JSON.parse(storedRidesToCollege) : [];
        this.ridesFromCollege = storedRidesFromCollege ? JSON.parse(storedRidesFromCollege) : [];
    }

    private saveToStorage(): void {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('drivers', JSON.stringify(this.drivers));
        localStorage.setItem('ridesToCollege', JSON.stringify(this.ridesToCollege));
        localStorage.setItem('ridesFromCollege', JSON.stringify(this.ridesFromCollege));
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
        localStorage.removeItem('ridesToCollege');
        localStorage.removeItem('ridesFromCollege');

        // Confirm data has been cleared
        console.log('All data cleared from database');
    }

    clearRidesData(): void {
        localStorage.removeItem('ridesToCollege');
        localStorage.removeItem('ridesFromCollege');

        console.log('All rides data cleared from database');
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

    //Ride methods///

    addRide(ride: IRide): void {
        if (ride.direction === 'To Campus') {
            this.ridesToCollege.push(ride);
        } else if (ride.direction === 'From Campus') {
            this.ridesFromCollege.push(ride);
        }
        //Persist the ride in local storage
        this.saveToStorage();
    }

    cancelRide(rideEmail: string, direction: string): void {
        let rides = direction === 'To Campus' ? this.ridesToCollege : this.ridesFromCollege;
        const index = rides.findIndex(ride => ride.rideEmail === rideEmail);
        if (index > -1) {
            rides.splice(index, 1);
            this.saveToStorage();
        }
    }

    getRides(direction: string): IRide[] {
        return direction === 'To Campus' ? this.ridesToCollege : this.ridesFromCollege;
    }

    updateRideStatus(rideEmail: string, direction: string, status: string): void {
        let rides = direction === 'To Campus' ? this.ridesToCollege : this.ridesFromCollege;
        const ride = rides.find(ride => ride.rideEmail === rideEmail);
        if (ride) {
            ride.status = status;
            this.saveToStorage();
        }
    }

    updateRideDetails(rideEmail: string, direction: string, updatedDetails: Partial<IRide>): void {
        let rides = direction === 'To Campus' ? this.ridesToCollege : this.ridesFromCollege;
        const rideIndex = rides.findIndex(ride => ride.rideEmail === rideEmail);
        if (rideIndex !== -1) {
            // Update the ride details with the new information provided
            rides[rideIndex] = {
                ...rides[rideIndex],
                ...updatedDetails
            };
            this.saveToStorage(); // Save the updated list to local storage
            alert('Ride updated successfully');
            console.log("Ride updated successfully:", rides[rideIndex]);
        } else {
            alert('Ride not found. Unable to update ride details.');
            console.error("Ride not found. Unable to update ride details.");
        }
    }

    retrieveListOfRidesFromCollege(): IRide[] {
        return this.ridesFromCollege;
    }

    retrieveListOfRidesToCollege(): IRide[] {
        return this.ridesToCollege;
    }

    getCurrentRide(): IRide | undefined {
        // Check 'ridesToCollege' array for the ride
        let currentRide = this.ridesToCollege.find(ride => ride.rideEmail === this.currentUserEmail);
        if (!currentRide) {
            // If not found, check 'ridesFromCollege' array
            currentRide = this.ridesFromCollege.find(ride => ride.rideEmail === this.currentUserEmail);
        }
        return currentRide;
    }


    getCurrentUserEmail(): string | null {
        return this.currentUserEmail;
    }

    setBooleanLogicForCreateRideButtons(createRideBool: boolean, cancelRideBool: boolean, statusBool: boolean, activeStatusBool: boolean): void {
        // Convert boolean values to strings using JSON.stringify and save them to localStorage
        localStorage.setItem('createRideBool', JSON.stringify(createRideBool));
        localStorage.setItem('cancelRideBool', JSON.stringify(cancelRideBool));
        localStorage.setItem('statusBool', JSON.stringify(statusBool));
        localStorage.setItem('activeStatusBool', JSON.stringify(activeStatusBool));
    }

    getBooleanLogicForCreateRideButtons(): {createRideBool: boolean, cancelRideBool: boolean, statusBool: boolean, activeStatusBool: boolean} {
        // Retrieve the string values from localStorage and convert them back to boolean using JSON.parse
        const createRideBool = JSON.parse(localStorage.getItem('createRideBool') || 'true'); // Default to true if null
        const cancelRideBool = JSON.parse(localStorage.getItem('cancelRideBool') || 'false'); // Default to false if null
        const statusBool = JSON.parse(localStorage.getItem('statusBool') || 'false'); // Default to false if null
        const activeStatusBool = JSON.parse(localStorage.getItem('activeStatusBool') || 'false'); // Default to false if null
        return { createRideBool, cancelRideBool, statusBool, activeStatusBool};
    }    

}//End of class