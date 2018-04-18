import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusWaitingComponent } from './cus-waiting.component';

describe('CusWaitingComponent', () => {
  let component: CusWaitingComponent;
  let fixture: ComponentFixture<CusWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
