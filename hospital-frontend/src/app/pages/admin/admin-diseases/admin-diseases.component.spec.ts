import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiseasesComponent } from './admin-diseases.component';

describe('AdminDiseasesComponent', () => {
  let component: AdminDiseasesComponent;
  let fixture: ComponentFixture<AdminDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDiseasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
