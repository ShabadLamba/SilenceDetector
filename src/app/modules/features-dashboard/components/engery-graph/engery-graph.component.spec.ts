import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngeryGraphComponent } from './engery-graph.component';

describe('EngeryGraphComponent', () => {
  let component: EngeryGraphComponent;
  let fixture: ComponentFixture<EngeryGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngeryGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngeryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
