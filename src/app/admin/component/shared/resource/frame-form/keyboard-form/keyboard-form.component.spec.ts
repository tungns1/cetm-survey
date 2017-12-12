import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardFormComponent } from './keyboard-form.component';

describe('KeyboardFormComponent', () => {
  let component: KeyboardFormComponent;
  let fixture: ComponentFixture<KeyboardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
