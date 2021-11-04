import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantPanelComponent } from './postulant-panel.component';

describe('PostulantPanelComponent', () => {
  let component: PostulantPanelComponent;
  let fixture: ComponentFixture<PostulantPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulantPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
