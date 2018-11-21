import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUiComponent } from './feedback-ui.component';

describe('FeedbackUiComponent', () => {
  let component: FeedbackUiComponent;
  let fixture: ComponentFixture<FeedbackUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
