import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlShortenerScreenComponent } from './url-shortener-screen.component';

describe('UrlShortenerScreenComponent', () => {
  let component: UrlShortenerScreenComponent;
  let fixture: ComponentFixture<UrlShortenerScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlShortenerScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlShortenerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
