import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTimeComponent } from './transaction-time.component';

describe('TransactionTimeComponent', () => {
  let component: TransactionTimeComponent;
  let fixture: ComponentFixture<TransactionTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
