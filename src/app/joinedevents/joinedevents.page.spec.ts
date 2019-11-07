import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedeventsPage } from './joinedevents.page';

describe('JoinedeventsPage', () => {
  let component: JoinedeventsPage;
  let fixture: ComponentFixture<JoinedeventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedeventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedeventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
