import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentListItemComponent } from './employment-list-item.component';

describe('EmploymentListItemComponent', () => {
  let component: EmploymentListItemComponent;
  let fixture: ComponentFixture<EmploymentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
