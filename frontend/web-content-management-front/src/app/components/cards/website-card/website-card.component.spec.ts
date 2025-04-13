import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteCardComponent } from './website-card.component';

describe('WebsiteCardComponent', () => {
  let component: WebsiteCardComponent;
  let fixture: ComponentFixture<WebsiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
