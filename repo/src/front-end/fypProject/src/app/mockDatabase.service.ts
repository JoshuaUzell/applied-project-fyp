import { IDriverDetails, IUserInfo } from "./database.interface";
import { IDatabaseInterface } from "./database.interface";
import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const DATABASE_SERVICE_TOKEN = new InjectionToken<IDatabaseInterface>('DATABASE_SERVICE');


@Injectable({
    providedIn: 'root' // A singleton instance of this class is created and injected
})

export class MockDatabaseService implements IDatabaseInterface {
    private users: IUserInfo[] = [];
    private drivers: IDriverDetails[] = [];

    constructor() {
        this.loadFromStorage();
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

    addUserDetails(userInfo: IUserInfo): void {
        userInfo.id = `user_${this.users.length + 1}`; // Generate a unique ID for the new user
        this.users.push(userInfo); // Add the new user to the list of users
        this.saveToStorage(); // Save the updated list of users to local storage
    }

    retrieveUserDetails(email: string): IUserInfo | undefined {
        return this.users.find(user => user.email === email);
    }

    addDriverDetails(driverDetails: IDriverDetails): void {
        driverDetails.id = `driver_${this.drivers.length + 1}`;
        this.drivers.push(driverDetails);
        this.saveToStorage();
    }

    retrieveDriverDetails(driverId: string): IDriverDetails | undefined {
        return this.drivers.find(driver => driver.id === driverId);
    }

    retrieveListOfDrivers(): IDriverDetails[] {
        return this.drivers;
    }

    setAvailableSpaceForRide(driverId: string, availableSpace: number): void {
        const driver = this.drivers.find(driver => driver.id === driverId);
        if (driver) {
            driver.availableSpace = availableSpace;
            this.saveToStorage();
        }
    }

    retrieveAvailableSpaceForRide(driverId: string): number | undefined {
        const driver = this.drivers.find(driver => driver.id === driverId);
        return driver ? driver.availableSpace : undefined;
    }

    setListOfLocationsForRide(driverId: string, locations: string[]): void {
        const driver = this.drivers.find(driver => driver.id === driverId);
        if (driver) {
            driver.locationsForRide = locations;
            this.saveToStorage();
        }
    }

    retrieveListOfLocationsForRide(driverId: string): string[] | undefined {
        const driver = this.drivers.find(driver => driver.id === driverId);
        return driver ? driver.locationsForRide : undefined;
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
}