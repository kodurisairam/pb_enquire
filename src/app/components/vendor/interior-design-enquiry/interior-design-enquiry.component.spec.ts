import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorDesignEnquiryComponent } from './interior-design-enquiry.component';

describe('InteriorDesignEnquiryComponent', () => {
  let component: InteriorDesignEnquiryComponent;
  let fixture: ComponentFixture<InteriorDesignEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteriorDesignEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteriorDesignEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
