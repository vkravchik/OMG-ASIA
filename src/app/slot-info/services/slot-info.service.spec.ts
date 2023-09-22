import { TestBed } from '@angular/core/testing';

import { SlotInfoService } from './slot-info.service';

describe('SlotInfoService', () => {
  let service: SlotInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
