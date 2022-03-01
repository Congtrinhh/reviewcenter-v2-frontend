import { TestBed } from '@angular/core/testing';

import { ReviewBoxService } from './review-box.service';

describe('ReviewBoxService', () => {
  let service: ReviewBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
