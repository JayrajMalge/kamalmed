import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTreatmentsComponent } from './admin-treatments.component';

describe('AdminTreatmentsComponent', () => {
  let component: AdminTreatmentsComponent;
  let fixture: ComponentFixture<AdminTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTreatmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
