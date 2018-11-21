import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointConfigComponent } from './point-config.component';

describe('PointConfigComponent', () => {
  let component: PointConfigComponent;
  let fixture: ComponentFixture<PointConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
