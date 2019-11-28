import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribesPage } from './tribes.page';

describe('TribesPage', () => {
  let component: TribesPage;
  let fixture: ComponentFixture<TribesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
