import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPassComponent } from './security-pass.component';

describe('SecurityPassComponent', () => {
  let component: SecurityPassComponent;
  let fixture: ComponentFixture<SecurityPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
