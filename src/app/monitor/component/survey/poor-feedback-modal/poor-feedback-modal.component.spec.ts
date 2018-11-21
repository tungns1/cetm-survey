import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoorFeedbackModalComponent } from './poor-feedback-modal.component';

describe('PoorFeedbackModalComponent', () => {
  let component: PoorFeedbackModalComponent;
  let fixture: ComponentFixture<PoorFeedbackModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoorFeedbackModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoorFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
