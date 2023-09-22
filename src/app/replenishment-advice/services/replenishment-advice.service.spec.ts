import { TestBed } from '@angular/core/testing';

import { ReplenishmentAdviceService } from './replenishment-advice.service';

describe('ReplenishmentAdviceService', () => {
  let service: ReplenishmentAdviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplenishmentAdviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
