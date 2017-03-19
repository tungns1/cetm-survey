import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStoreComponent } from './application-store.component';

describe('ApplicationStoreComponent', () => {
  let component: ApplicationStoreComponent;
  let fixture: ComponentFixture<ApplicationStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
