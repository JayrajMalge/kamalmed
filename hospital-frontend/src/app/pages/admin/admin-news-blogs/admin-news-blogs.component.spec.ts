import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsBlogsComponent } from './admin-news-blogs.component';

describe('AdminNewsBlogsComponent', () => {
  let component: AdminNewsBlogsComponent;
  let fixture: ComponentFixture<AdminNewsBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewsBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNewsBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
