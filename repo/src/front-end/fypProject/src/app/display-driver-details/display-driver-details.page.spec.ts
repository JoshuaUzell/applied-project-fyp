import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayDriverDetailsPage } from './display-driver-details.page';

describe('DisplayDriverDetailsPage', () => {
  let component: DisplayDriverDetailsPage;
  let fixture: ComponentFixture<DisplayDriverDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DisplayDriverDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
