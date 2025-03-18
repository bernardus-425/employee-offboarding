import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardDialogComponent } from './offboard-dialog.component';

describe('OffboardDialogComponent', () => {
  let component: OffboardDialogComponent;
  let fixture: ComponentFixture<OffboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
