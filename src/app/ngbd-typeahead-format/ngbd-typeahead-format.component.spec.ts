import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdTypeaheadFormatComponent } from './ngbd-typeahead-format.component';

describe('NgbdTypeaheadFormatComponent', () => {
  let component: NgbdTypeaheadFormatComponent;
  let fixture: ComponentFixture<NgbdTypeaheadFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbdTypeaheadFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdTypeaheadFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
