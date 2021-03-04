import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocorrelationComponent } from './autocorrelation.component';

describe('AutocorrelationComponent', () => {
  let component: AutocorrelationComponent;
  let fixture: ComponentFixture<AutocorrelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocorrelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocorrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
