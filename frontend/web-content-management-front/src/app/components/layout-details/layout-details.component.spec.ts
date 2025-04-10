import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDetailsComponent } from './layout-details.component';

describe('LayoutDetailsComponent', () => {
  let component: LayoutDetailsComponent;
  let fixture: ComponentFixture<LayoutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
