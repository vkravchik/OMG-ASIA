import { TestBed } from '@angular/core/testing';

import { ProductReleaseService } from './product-release.service';

describe('ProductReleaseService', () => {
  let service: ProductReleaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductReleaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
