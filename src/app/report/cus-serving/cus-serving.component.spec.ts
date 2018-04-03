import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusServingComponent } from './cus-serving.component';

describe('CusServingComponent', () => {
  let component: CusServingComponent;
  let fixture: ComponentFixture<CusServingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusServingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusServingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
