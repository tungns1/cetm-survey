import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterCellComponent } from './counter-cell.component';

describe('CounterCellComponent', () => {
  let component: CounterCellComponent;
  let fixture: ComponentFixture<CounterCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
