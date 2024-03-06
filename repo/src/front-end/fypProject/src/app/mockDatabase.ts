import { DriverDetails, UserInfo } from "./database.interface";
import { DatabaseInterface } from "./database.interface";

class MockDatabase implements DatabaseInterface {
    private users: UserInfo[] = [];
    private drivers: DriverDetails[] = [];

    addUserDetails(userInfo: UserInfo): void {
        this.users.push(userInfo);
    }

    retrieveUserDetails(userId: string): UserInfo | undefined {
        return this.users.find(user => user.id === userId);
    }

    addDriverDetails(driverDetails: DriverDetails): void {
        this.drivers.push(driverDetails);
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
        }
    }

    retrieveListOfLocationsForRide(driverId: string): string[] | undefined {
        const driver = this.drivers.find(driver => driver.id === driverId);
        return driver ? driver.locationsForRide : undefined;
    }
}