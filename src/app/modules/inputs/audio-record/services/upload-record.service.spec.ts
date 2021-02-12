import { TestBed } from '@angular/core/testing';

import { UploadRecordService } from './upload-record.service';

describe('UploadRecordService', () => {
  let service: UploadRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
