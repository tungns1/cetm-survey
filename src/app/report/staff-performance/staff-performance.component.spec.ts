import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPerformanceComponent } from './staff-performance.component';

describe('StaffPerformanceComponent', () => {
  let component: StaffPerformanceComponent;
  let fixture: ComponentFixture<StaffPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
