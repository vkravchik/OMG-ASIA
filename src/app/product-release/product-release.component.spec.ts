import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReleaseComponent } from './product-release.component';

describe('ProductReleaseComponent', () => {
  let component: ProductReleaseComponent;
  let fixture: ComponentFixture<ProductReleaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductReleaseComponent]
    });
    fixture = TestBed.createComponent(ProductReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
