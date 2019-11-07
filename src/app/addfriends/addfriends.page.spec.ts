import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfriendsPage } from './addfriends.page';

describe('AddfriendsPage', () => {
  let component: AddfriendsPage;
  let fixture: ComponentFixture<AddfriendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfriendsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
