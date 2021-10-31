import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicListItemComponent } from './academic-list-item.component';

describe('AcademicListItemComponent', () => {
  let component: AcademicListItemComponent;
  let fixture: ComponentFixture<AcademicListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
