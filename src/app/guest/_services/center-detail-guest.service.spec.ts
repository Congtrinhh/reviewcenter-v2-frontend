import { TestBed } from '@angular/core/testing';

import { CenterDetailGuestService } from './center-detail-guest.service';

describe('CenterDetailGuestService', () => {
  let service: CenterDetailGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterDetailGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
