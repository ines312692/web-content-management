import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseEditorComponent } from './database-editor.component';

describe('DatabaseEditorComponent', () => {
  let component: DatabaseEditorComponent;
  let fixture: ComponentFixture<DatabaseEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
