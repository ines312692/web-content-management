import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatabaseModalComponent } from './create-database-modal.component';

describe('CreateDatabaseModalComponent', () => {
  let component: CreateDatabaseModalComponent;
  let fixture: ComponentFixture<CreateDatabaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDatabaseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDatabaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
