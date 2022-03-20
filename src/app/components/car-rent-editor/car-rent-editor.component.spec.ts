import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentEditorComponent } from './car-rent-editor.component';

describe('CarRentEditorComponent', () => {
  let component: CarRentEditorComponent;
  let fixture: ComponentFixture<CarRentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRentEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
