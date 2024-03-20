import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DriverDetailsPage } from './driver-details.page';

describe('DriverDetailsPage', () => {
  let component: DriverDetailsPage;
  let fixture: ComponentFixture<DriverDetailsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(DriverDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
