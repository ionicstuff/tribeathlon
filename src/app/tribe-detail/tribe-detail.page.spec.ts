import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeDetailPage } from './tribe-detail.page';

describe('TribeDetailPage', () => {
  let component: TribeDetailPage;
  let fixture: ComponentFixture<TribeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
