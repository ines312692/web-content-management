import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseContentComponent } from './database-content.component';

describe('DatabaseContentComponent', () => {
  let component: DatabaseContentComponent;
  let fixture: ComponentFixture<DatabaseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
