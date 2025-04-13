import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebsiteModalComponent } from './edit-website-modal.component';

describe('EditWebsiteModalComponent', () => {
  let component: EditWebsiteModalComponent;
  let fixture: ComponentFixture<EditWebsiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWebsiteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWebsiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
