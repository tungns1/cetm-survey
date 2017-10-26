import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersMapComponent } from './counters-map.component';

describe('CountersMapComponent', () => {
  let component: CountersMapComponent;
  let fixture: ComponentFixture<CountersMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountersMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
