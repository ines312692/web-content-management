import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWebsiteCardComponent } from './project-website-card.component';

describe('ProjectWebsiteCardComponent', () => {
  let component: ProjectWebsiteCardComponent;
  let fixture: ComponentFixture<ProjectWebsiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWebsiteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWebsiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
