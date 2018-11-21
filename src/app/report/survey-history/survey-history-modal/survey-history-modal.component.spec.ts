import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHistoryModalComponent } from './survey-history-modal.component';

describe('SurveyHistoryModalComponent', () => {
  let component: SurveyHistoryModalComponent;
  let fixture: ComponentFixture<SurveyHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
