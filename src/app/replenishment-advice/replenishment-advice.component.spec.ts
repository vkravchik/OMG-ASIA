import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishmentAdviceComponent } from './replenishment-advice.component';

describe('ReplenishmentAdviceComponent', () => {
  let component: ReplenishmentAdviceComponent;
  let fixture: ComponentFixture<ReplenishmentAdviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReplenishmentAdviceComponent]
    });
    fixture = TestBed.createComponent(ReplenishmentAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
