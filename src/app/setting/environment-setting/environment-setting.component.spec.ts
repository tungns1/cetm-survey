import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentSettingComponent } from './environment-setting.component';

describe('EnvironmentSettingComponent', () => {
  let component: EnvironmentSettingComponent;
  let fixture: ComponentFixture<EnvironmentSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
