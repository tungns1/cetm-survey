import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeaterFormComponent } from './repeater-form.component';

describe('RepeaterFormComponent', () => {
  let component: RepeaterFormComponent;
  let fixture: ComponentFixture<RepeaterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeaterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeaterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
