import { TestBed } from '@angular/core/testing';

import { DialogPopService } from './dialog-pop.service';

describe('DialogPopService', () => {
  let service: DialogPopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogPopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
