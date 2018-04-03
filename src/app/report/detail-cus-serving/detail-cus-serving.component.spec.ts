import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCusServingComponent } from './detail-cus-serving.component';

describe('DetailCusServingComponent', () => {
  let component: DetailCusServingComponent;
  let fixture: ComponentFixture<DetailCusServingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCusServingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCusServingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
