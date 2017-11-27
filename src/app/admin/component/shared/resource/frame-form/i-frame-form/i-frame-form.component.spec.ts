import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IFrameFormComponent } from './i-frame-form.component';

describe('IFrameFormComponent', () => {
  let component: IFrameFormComponent;
  let fixture: ComponentFixture<IFrameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IFrameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IFrameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
