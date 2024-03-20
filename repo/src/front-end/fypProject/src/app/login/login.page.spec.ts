import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { LoginPage } from './login.page';
import { RouterTestingModule } from '@angular/router/testing'; // If using Router
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MockDatabaseService } from '../mockDatabase.service';
import { IPasswordHandler } from '../passwordHandler.interface';
import { PASSWORD_HANDLER_TOKEN, PasswordHandlerService } from '../password-handler.service';
import { DATABASE_SERVICE_TOKEN } from '../mockDatabase.service';
import { IDatabaseInterface } from '../database.interface';
import { FormsModule } from '@angular/forms';


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
