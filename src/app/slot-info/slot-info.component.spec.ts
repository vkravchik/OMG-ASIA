import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotInfoComponent } from './slot-info.component';

describe('SlotInfoComponent', () => {
  let component: SlotInfoComponent;
  let fixture: ComponentFixture<SlotInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SlotInfoComponent]
    });
    fixture = TestBed.createComponent(SlotInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
