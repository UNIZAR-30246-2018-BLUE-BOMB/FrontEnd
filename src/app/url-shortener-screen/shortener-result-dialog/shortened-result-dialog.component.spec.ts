import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenedResultDialogComponent } from './shortened-result-dialog.component';

describe('ShortenedResultDialogComponent', () => {
  let component: ShortenedResultDialogComponent;
  let fixture: ComponentFixture<ShortenedResultDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortenedResultDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortenedResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
