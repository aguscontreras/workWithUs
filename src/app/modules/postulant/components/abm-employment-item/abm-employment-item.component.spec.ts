import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEmploymentItemComponent } from './abm-employment-item.component';

describe('AbmEmploymentItemComponent', () => {
  let component: AbmEmploymentItemComponent;
  let fixture: ComponentFixture<AbmEmploymentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmEmploymentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmEmploymentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
