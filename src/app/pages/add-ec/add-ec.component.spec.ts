import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEcComponent } from './add-ec.component';

describe('AddEcComponent', () => {
  let component: AddEcComponent;
  let fixture: ComponentFixture<AddEcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEcComponent]
    });
    fixture = TestBed.createComponent(AddEcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
