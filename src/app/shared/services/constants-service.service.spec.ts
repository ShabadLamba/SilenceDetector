import { TestBed } from '@angular/core/testing';

import { ConstantsServiceService } from './constants-service.service';

describe('ConstantsServiceService', () => {
  let service: ConstantsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
