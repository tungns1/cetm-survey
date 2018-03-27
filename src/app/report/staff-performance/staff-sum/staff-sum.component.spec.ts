import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSumComponent } from './staff-sum.component';

describe('StaffSumComponent', () => {
  let component: StaffSumComponent;
  let fixture: ComponentFixture<StaffSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
