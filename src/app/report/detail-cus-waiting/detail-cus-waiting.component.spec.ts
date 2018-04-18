import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCusWaitingComponent } from './detail-cus-waiting.component';

describe('DetailCusWaitingComponent', () => {
  let component: DetailCusWaitingComponent;
  let fixture: ComponentFixture<DetailCusWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCusWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCusWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
