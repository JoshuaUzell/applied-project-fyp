export interface IPasswordHandler {
    hashPassword(password: string): Promise<string>;
    checkPasswordAndConfirmPasswordMatch(password: string, confirmPassword: string): boolean;
    verifyPassword(password: string, hash: string): Promise<boolean>;
  }