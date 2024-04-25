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
    name: string;
    id: string;
    driverEmail: string; //Driver email will be the same as the user email
    licenseDateOfIssue: string;
    licenseDateOfExpiry: string;
    licenseNumber: string;
    vehicleModel: string;
    vehicleMake: string;
  }

  //Interface for Ride
  export interface IRide {
    driverName: string;
    rideEmail: string;
    status: string;
    numberOfSeats: number;
    direction: string;
    locationAtCollege: string;
    locationOutsideOfCollege: string;
    createRideBool: boolean;
    cancelRideBool: boolean;
    statusBool: boolean;
    activeStatusBool: boolean;
    progressBool: boolean;
    disableInputButtonBool: boolean;
  }
  
  export interface IDatabaseInterface {
    refreshData(): void;
    addUserDetails(userInfo: IUserInfo): void;
    retrieveUserDetails(email: string): IUserInfo | undefined; // Returns JSON structure for a user
    addDriverDetails(driverDetails: IDriverDetails): void;
    retrieveDriverDetails(driverId: string): IDriverDetails | undefined; // Returns JSON structure for a driver
    retrieveListOfDrivers(): IDriverDetails[]; // Returns an array of driver JSON objects
    retrieveAllUsers(): IUserInfo[];
    clearData(): void;
    clearRidesData(): void;
    emailExists(email: string): boolean;
    getGenderOptions(): string[];
    getPersonalTraitsOptions(): Array<{value: string, display: string}>;
    getHobbiesOptions(): Array<{value: string, display: string}>;
    setCurrentUserEmail(email: string): void;
    getCurrentUser(): IUserInfo | undefined;
    updateCurrentUserDetails(updatedDetails: Partial<IUserInfo>): void;
    generateUniqueID(): string;
    isLicenseNumberValid(licenseNumber: string): boolean;
    validateDatesAreNotEqual(issueDate: string, expiryDate: string): boolean;
    validateExpiryDateIsNotPresentOrPriorDate(expiryDate: string): boolean;
    validateExpiryAfterIssue(issueDate: string, expiryDate: string): boolean;
    getCurrentDriver(): IDriverDetails | undefined;
    removeCurrentDriver(): void;
    updateCurrentDriverDetails(updatedDetails: Partial<IUserInfo>): void;
    addRide(ride: IRide): void;
    cancelRide(rideId: string, direction: string): void;
    getRides(direction: string): IRide[]; 
    updateRideStatus(rideId: string, direction: string, status: string): void;
    updateRideDetails(rideEmail: string, direction: string, updatedDetails: Partial<IRide>): void;
    retrieveListOfRidesFromCollege(): IRide[];
    retrieveListOfRidesToCollege(): IRide[];
    getCurrentRide(): IRide | undefined;
    getCurrentUserEmail(): string | null;
    setBooleanLogicForCreateRideButtons(createRideBool: boolean, cancelRideBool: boolean, statusBool: boolean, activeStatusBool: boolean, progressBool: boolean, disableInputButtonBool: boolean): void;
    getBooleanLogicForCreateRideButtons(): {createRideBool: boolean, cancelRideBool: boolean, statusBool: boolean, activeStatusBool: boolean, progressBool: boolean, disableInputButtonBool: boolean};
  }
  