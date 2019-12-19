import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommontribesPage } from './commontribes.page';

describe('CommontribesPage', () => {
  let component: CommontribesPage;
  let fixture: ComponentFixture<CommontribesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommontribesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommontribesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
