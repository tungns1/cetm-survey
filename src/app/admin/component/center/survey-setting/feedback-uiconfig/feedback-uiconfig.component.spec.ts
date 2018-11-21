import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUiconfigComponent } from './feedback-uiconfig.component';

describe('FeedbackUiconfigComponent', () => {
  let component: FeedbackUiconfigComponent;
  let fixture: ComponentFixture<FeedbackUiconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackUiconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackUiconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
