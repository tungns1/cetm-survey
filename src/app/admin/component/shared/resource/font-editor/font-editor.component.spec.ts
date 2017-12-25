import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontEditorComponent } from './font-editor.component';

describe('FontEditorComponent', () => {
  let component: FontEditorComponent;
  let fixture: ComponentFixture<FontEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
