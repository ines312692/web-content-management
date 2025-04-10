import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCardComponent } from './database-card.component';

describe('DatabaseCardComponent', () => {
  let component: DatabaseCardComponent;
  let fixture: ComponentFixture<DatabaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
