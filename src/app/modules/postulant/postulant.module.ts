import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulantPanelComponent } from './pages/postulant-panel/postulant-panel.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { AcademicDataComponent } from './components/academic-data/academic-data.component';
import { EmploymentDataComponent } from './components/employment-data/employment-data.component';
import { AbmAcademicItemComponent } from './components/abm-academic-item/abm-academic-item.component';
import { AcademicListItemComponent } from './components/academic-list-item/academic-list-item.component';
import { DirectivesModule } from '../../_directives/_directives.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostulantPanelComponent,
    PersonalDataFormComponent,
    AcademicDataComponent,
    EmploymentDataComponent,
    AbmAcademicItemComponent,
    AcademicListItemComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    DirectivesModule,
    SharedModule,
  ],
})
export class PostulantModule {}
