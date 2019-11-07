import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrainingPage } from './all-training.page';

describe('AllTrainingPage', () => {
  let component: AllTrainingPage;
  let fixture: ComponentFixture<AllTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTrainingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
