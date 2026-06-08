import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpecializationsComponent } from './admin-specializations.component';

describe('AdminSpecializationsComponent', () => {
  let component: AdminSpecializationsComponent;
  let fixture: ComponentFixture<AdminSpecializationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSpecializationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSpecializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
