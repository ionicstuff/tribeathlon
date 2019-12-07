import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticipantsPage } from './view-participants.page';

describe('ViewParticipantsPage', () => {
  let component: ViewParticipantsPage;
  let fixture: ComponentFixture<ViewParticipantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewParticipantsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticipantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
