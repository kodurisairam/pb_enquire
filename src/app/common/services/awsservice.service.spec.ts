import { TestBed } from '@angular/core/testing';

import { AwsserviceService } from './awsservice.service';

describe('AwsserviceService', () => {
  let service: AwsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
