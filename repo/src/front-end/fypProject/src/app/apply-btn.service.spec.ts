import { TestBed } from '@angular/core/testing';

import { ApplyBtnService } from './apply-btn.service';

describe('ApplyBtnService', () => {
  let service: ApplyBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
