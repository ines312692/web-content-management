import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSetupComponentComponent } from './website-setup-component.component';

describe('WebsiteSetupComponentComponent', () => {
  let component: WebsiteSetupComponentComponent;
  let fixture: ComponentFixture<WebsiteSetupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteSetupComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteSetupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
