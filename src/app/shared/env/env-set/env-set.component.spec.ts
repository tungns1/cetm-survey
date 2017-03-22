import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvSetComponent } from './env-set.component';

describe('EnvSetComponent', () => {
  let component: EnvSetComponent;
  let fixture: ComponentFixture<EnvSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
