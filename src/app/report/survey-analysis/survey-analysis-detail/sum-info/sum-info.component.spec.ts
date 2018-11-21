import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumInfoComponent } from './sum-info.component';

describe('SumInfoComponent', () => {
  let component: SumInfoComponent;
  let fixture: ComponentFixture<SumInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
