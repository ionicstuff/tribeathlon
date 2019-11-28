import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtribePage } from './addtribe.page';

describe('AddtribePage', () => {
  let component: AddtribePage;
  let fixture: ComponentFixture<AddtribePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtribePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
