import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcheventPage } from './searchevent.page';

describe('SearcheventPage', () => {
  let component: SearcheventPage;
  let fixture: ComponentFixture<SearcheventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcheventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcheventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
