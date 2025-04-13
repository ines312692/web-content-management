import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWebsiteModalComponent } from './create-website-modal.component';

describe('CreateWebsiteModalComponent', () => {
  let component: CreateWebsiteModalComponent;
  let fixture: ComponentFixture<CreateWebsiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWebsiteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWebsiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
