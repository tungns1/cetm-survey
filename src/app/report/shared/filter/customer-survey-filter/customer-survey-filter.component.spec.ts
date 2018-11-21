import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSurveyFilterComponent } from './customer-survey-filter.component';

describe('CustomerSurveyFilterComponent', () => {
  let component: CustomerSurveyFilterComponent;
  let fixture: ComponentFixture<CustomerSurveyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSurveyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSurveyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
