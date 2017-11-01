import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCounterSettingComponent } from './super-counter-setting.component';

describe('SuperCounterSettingComponent', () => {
  let component: SuperCounterSettingComponent;
  let fixture: ComponentFixture<SuperCounterSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperCounterSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCounterSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
