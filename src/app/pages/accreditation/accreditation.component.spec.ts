import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccreditationComponent } from './accreditation.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AccreditationComponent', () => {
  let component: AccreditationComponent;
  let fixture: ComponentFixture<AccreditationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccreditationComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(AccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
