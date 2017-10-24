import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupperCounterComponent } from './supper-counter.component';

describe('SupperCounterComponent', () => {
  let component: SupperCounterComponent;
  let fixture: ComponentFixture<SupperCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupperCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupperCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
