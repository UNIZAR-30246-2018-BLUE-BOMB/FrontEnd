import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsGlobalComponent } from './statics-global.component';

describe('StaticsGlobalComponent', () => {
  let component: StaticsGlobalComponent;
  let fixture: ComponentFixture<StaticsGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticsGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticsGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
