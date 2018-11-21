import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkChannelComponent } from './link-channel.component';

describe('LinkChannelComponent', () => {
  let component: LinkChannelComponent;
  let fixture: ComponentFixture<LinkChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
