import { TestBed } from '@angular/core/testing';

import { RsbService } from './rsb.service';

describe('RsbService', () => {
  let service: RsbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
