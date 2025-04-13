import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSetupComponent } from './website-setup.component';

describe('WebsiteSetupComponentComponent', () => {
  let component: WebsiteSetupComponent;
  let fixture: ComponentFixture<WebsiteSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
