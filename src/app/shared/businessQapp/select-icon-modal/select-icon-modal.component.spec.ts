import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIconModalComponent } from './select-icon-modal.component';

describe('SelectIconModalComponent', () => {
  let component: SelectIconModalComponent;
  let fixture: ComponentFixture<SelectIconModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectIconModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIconModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
