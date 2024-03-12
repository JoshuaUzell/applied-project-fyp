export interface IPasswordHandler {
    hashPassword(password: string): Promise<string>;
    checkPasswordMatchForRegistration(password: string, confirmPassword: string): boolean;
    verifyPassword(password: string, hash: string): Promise<boolean>;
  }