import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nFormComponent } from './i18n-form.component';

describe('I18nFormComponent', () => {
  let component: I18nFormComponent;
  let fixture: ComponentFixture<I18nFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I18nFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
