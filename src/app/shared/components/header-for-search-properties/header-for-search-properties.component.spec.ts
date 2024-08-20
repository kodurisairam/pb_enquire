import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderForSearchPropertiesComponent } from './header-for-search-properties.component';

describe('HeaderForSearchPropertiesComponent', () => {
  let component: HeaderForSearchPropertiesComponent;
  let fixture: ComponentFixture<HeaderForSearchPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderForSearchPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderForSearchPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
