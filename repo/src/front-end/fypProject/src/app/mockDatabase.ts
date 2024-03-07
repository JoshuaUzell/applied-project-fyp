import { DriverDetails, UserInfo } from "./database.interface";
import { DatabaseInterface } from "./database.interface";
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root' // A singleton instance of this class is created and injected
})

export class MockDatabase implements DatabaseInterface {
    private users: UserInfo[] = [];
    private drivers: DriverDetails[] = [];

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

    addUserDetails(userInfo: UserInfo): void {
        userInfo.id = `user_${this.users.length + 1}`; // Generate a unique ID for the new user
        this.users.push(userInfo); // Add the new user to the list of users
        this.saveToStorage(); // Save the updated list of users to local storage
    }

    retrieveUserDetails(email: string): UserInfo | undefined {
        return this.users.find(user => user.email === email);
    }

    addDriverDetails(driverDetails: DriverDetails): void {
        driverDetails.id = `driver_${this.drivers.length + 1}`;
        this.drivers.push(driverDetails);
        this.saveToStorage();
    }

    retrieveDriverDetails(driverId: string): DriverDetails | undefined {
        return this.drivers.find(driver => driver.id === driverId);
    }

    retrieveListOfDrivers(): DriverDetails[] {
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
    retrieveAllUsers(): UserInfo[] {
        return this.users;
    }

    clearData(): void {
        // Clear data from localStorage
        localStorage.removeItem('users');
        localStorage.removeItem('drivers');

        // Confirm data has been cleared
        console.log('All data cleared from database');
    }
}