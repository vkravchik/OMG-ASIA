import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToolbarComponent } from './search-toolbar.component';

describe('SearchToolbarComponent', () => {
  let component: SearchToolbarComponent;
  let fixture: ComponentFixture<SearchToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchToolbarComponent]
    });
    fixture = TestBed.createComponent(SearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
