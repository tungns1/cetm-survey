import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCounterActionComponent } from './super-counter-action.component';

describe('SuperCounterActionComponent', () => {
  let component: SuperCounterActionComponent;
  let fixture: ComponentFixture<SuperCounterActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperCounterActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCounterActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
