import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnalysisDetailComponent } from './survey-analysis-detail.component';

describe('SurveyAnalysisDetailComponent', () => {
  let component: SurveyAnalysisDetailComponent;
  let fixture: ComponentFixture<SurveyAnalysisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAnalysisDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAnalysisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
