import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecordComponent } from './dialog-record.component';

describe('DialogRecordComponent', () => {
  let component: DialogRecordComponent;
  let fixture: ComponentFixture<DialogRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
