import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarEnquiryComponent } from './solar-enquiry.component';

describe('SolarEnquiryComponent', () => {
  let component: SolarEnquiryComponent;
  let fixture: ComponentFixture<SolarEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
