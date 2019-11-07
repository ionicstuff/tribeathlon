import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventPage } from './addevent.page';

describe('AddeventPage', () => {
  let component: AddeventPage;
  let fixture: ComponentFixture<AddeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
