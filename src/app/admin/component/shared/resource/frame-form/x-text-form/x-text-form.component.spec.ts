import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTextFormComponent } from './x-text-form.component';

describe('XTextFormComponent', () => {
  let component: XTextFormComponent;
  let fixture: ComponentFixture<XTextFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XTextFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XTextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
