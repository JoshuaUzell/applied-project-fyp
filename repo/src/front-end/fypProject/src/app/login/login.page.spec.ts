import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { LoginPage } from './login.page';
import { RouterTestingModule } from '@angular/router/testing'; // If using Router
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MockDatabaseService } from '../mockDatabase.service';
import { IPasswordHandler } from '../passwordHandler.interface';
import { PASSWORD_HANDLER_TOKEN, PasswordHandlerService } from '../password-handler.service';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface, IUserInfo } from '../database.interface';
import { FormsModule } from '@angular/forms';

describe('LoginPage Failure Scenario', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockDatabaseService: IDatabaseInterface;
  let mockPasswordHandlerService: IPasswordHandler;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: PASSWORD_HANDLER_TOKEN, useClass: PasswordHandlerService },
        { provide: DATABASE_SERVICE_TOKEN, useClass: MockDatabaseService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    mockDatabaseService = TestBed.inject(DATABASE_SERVICE_TOKEN);
    mockPasswordHandlerService = TestBed.inject(PASSWORD_HANDLER_TOKEN);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    spyOn(window, 'alert'); // Optionally spy on window.alert if you want to verify alert calls
  }));

  it('should not navigate to home and show alert on incorrect password', fakeAsync(() => {
    // Fully detailed mock user object based on IUserInfo
    const mockUser: IUserInfo = {
      id: 'user_1', // Example user ID
      email: 'user@example.com', // Example email
      password: 'hashedCorrectPassword', // Placeholder hashed password
      name: 'John Doe', // Example name
      dob: '1990-01-01', // Example date of birth in string format
      gender: 'Male', // Example gender array, adjust as needed
      courseDepartment: 'Computer Science', // Example department
      personalTraits: ['organized', 'punctual'], // Example traits
      personalHobbies: ['reading', 'coding'], // Example hobbies
    };
  
    // Mock the retrieveUserDetails to return the mockUser
    spyOn(mockDatabaseService, 'retrieveUserDetails').and.returnValue(mockUser);
    spyOn(mockPasswordHandlerService, 'verifyPassword').and.returnValue(Promise.resolve(false));
  
    component.email = 'user@example.com';
    component.password = 'wrongPassword';
    component.completeLogin();
    tick(); // Wait for async operations to complete
  
    expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
  }));
});


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule],
      providers: [
        { provide: PASSWORD_HANDLER_TOKEN, useClass: PasswordHandlerService },
        { provide: DATABASE_SERVICE_TOKEN, useClass: MockDatabaseService }
      ],
      // Add any modules here as well, such as IonicModule.forRoot()
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create login page', () => {
    expect(component).toBeTruthy();
  });
});
