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
    vehicleModel: string;
    vehicleMake: string;
  }
  
  export interface IDatabaseInterface {
    addUserDetails(userInfo: IUserInfo): void;
    retrieveUserDetails(email: string): IUserInfo | undefined; // Returns JSON structure for a user
    addDriverDetails(driverDetails: IDriverDetails): void;
    retrieveDriverDetails(driverId: string): IDriverDetails | undefined; // Returns JSON structure for a driver
    retrieveListOfDrivers(): IDriverDetails[]; // Returns an array of driver JSON objects
    retrieveAllUsers(): IUserInfo[];
    clearData(): void;
    emailExists(email: string): boolean;
    getGenderOptions(): string[];
    getPersonalTraitsOptions(): Array<{value: string, display: string}>;
    getHobbiesOptions(): Array<{value: string, display: string}>;
    setCurrentUserEmail(email: string): void;
    getCurrentUser(): IUserInfo | undefined;
    updateCurrentUserDetails(updatedDetails: Partial<IUserInfo>): void;
    generateUniqueID(): string;
    isLicenseNumberValid(licenseNumber: string): boolean;
  }
  