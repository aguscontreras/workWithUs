import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmAcademicItemComponent } from './abm-academic-item.component';

describe('AbmAcademicItemComponent', () => {
  let component: AbmAcademicItemComponent;
  let fixture: ComponentFixture<AbmAcademicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmAcademicItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmAcademicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
