import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenerResultDialogComponent } from './shortener-result-dialog.component';

describe('ShortenerResultDialogComponent', () => {
  let component: ShortenerResultDialogComponent;
  let fixture: ComponentFixture<ShortenerResultDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortenerResultDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortenerResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
