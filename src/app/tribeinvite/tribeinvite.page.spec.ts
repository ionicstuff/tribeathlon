import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeinvitePage } from './tribeinvite.page';

describe('TribeinvitePage', () => {
  let component: TribeinvitePage;
  let fixture: ComponentFixture<TribeinvitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribeinvitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribeinvitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
