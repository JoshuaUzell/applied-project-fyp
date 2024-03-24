//Interface for UserInfo data which will be formatted as JSON
export interface IUserInfo {
    id: string;
    email: string;
    password: string;
    name: string;
    dob: string;
    gender: string;
    courseDepartment: string;
    personalTraits: string[];
    personalHobbies: string[];
  } 

  //Interface for DriverDetails data which will be formatted as JSON
  export interface IDriverDetails {
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
  
  export interface IDatabaseInterface {
    addUserDetails(userInfo: IUserInfo): void;
    retrieveUserDetails(email: string): IUserInfo | undefined; // Returns JSON structure for a user
    addDriverDetails(driverDetails: IDriverDetails): void;
    retrieveDriverDetails(driverId: string): IDriverDetails | undefined; // Returns JSON structure for a driver
    retrieveListOfDrivers(): IDriverDetails[]; // Returns an array of driver JSON objects
    setAvailableSpaceForRide(driverId: string, availableSpace: number): void;
    retrieveAvailableSpaceForRide(driverId: string): number | undefined;
    setListOfLocationsForRide(driverId: string, locations: string[]): void;
    retrieveListOfLocationsForRide(driverId: string): string[] | undefined;
    retrieveAllUsers(): IUserInfo[];
    clearData(): void;
    emailExists(email: string): boolean;
    getGenderOptions(): string[];
    getPersonalTraitsOptions(): Array<{value: string, display: string}>;
    getHobbiesOptions(): Array<{value: string, display: string}>;
    setCurrentUserEmail(email: string): void;
    getCurrentUser(): IUserInfo | undefined;
    updateCurrentUserDetails(updatedDetails: Partial<IUserInfo>): void;
  }
  