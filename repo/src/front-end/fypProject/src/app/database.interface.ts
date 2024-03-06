//Interface for UserInfo data which will be formatted as JSON
interface UserInfo {
    id: string;
    email: string;
    password: string;
    name: string;
    dob: string;
    gender: string[];
    courseDepartment: string;
    personalTraits: string[];
    personalHobbies: string[];
  }

  //Interface for DriverDetails data which will be formatted as JSON
  interface DriverDetails {
    id: string;
    licenseDateOfIssue: string;
    licenseDateOfExpiry: string;
    licenseNumber: string;
    pictureOfLicense: string;
    vehicleModel: string;
    vehicleMake: string;
    availableSpace: number;
    locationsForRide: string[];
    
  }
  
  export interface DatabaseInterface {
    addUserDetails(userInfo: UserInfo): void;
    retrieveUserDetails(userId: string): UserInfo; // Returns JSON structure for a user
    addDriverDetails(driverDetails: DriverDetails): void;
    retrieveDriverDetails(driverId: string): DriverDetails; // Returns JSON structure for a driver
    retrieveListOfDrivers(): DriverDetails[]; // Returns an array of driver JSON objects
    setAvailableSpaceForRide(driverId: string, availableSpace: number): void;
    retrieveAvailableSpaceForRide(driverId: string): number;
    setListOfLocationsForRide(driverId: string, locations: string[]): void;
    retrieveListOfLocationsForRide(driverId: string): string[];
  }
  