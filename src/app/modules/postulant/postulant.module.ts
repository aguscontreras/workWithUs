import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulantPanelComponent } from './pages/postulant-panel/postulant-panel.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';

@NgModule({
  declarations: [PostulantPanelComponent, PersonalDataFormComponent],
  imports: [CommonModule, PrimengModule, ReactiveFormsModule],
})
export class PostulantModule {}
