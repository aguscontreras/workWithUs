import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AcademicLevel } from '../../../../_models';
import { AcademicStates } from '../../../../_models/academicStates';
import { DropdownYearDirective } from '../../../../_directives/dropdowns/dropdown-year.directive';
import { AcademicItem } from '../../../../_models/academicItem';

@Component({
  selector: 'app-abm-academic-item',
  templateUrl: './abm-academic-item.component.html',
  styleUrls: ['./abm-academic-item.component.scss'],
})
export class AbmAcademicItemComponent implements OnInit {
  states: SelectItem[];
  levels: SelectItem[];
  academicDataForm: FormGroup;
  selectedItem: AcademicItem;
  submitted: boolean;
  @ViewChild('anioHasta', { read: DropdownYearDirective })
  private anioHasta: DropdownYearDirective;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    this.config.width = '65%';
  }

  ngOnInit(): void {
    this.states = [
      { label: 'Culminado', value: AcademicStates.Culminado },
      { label: 'Cursando', value: AcademicStates.Cursando },
      { label: 'Aplazado', value: AcademicStates.Aplazado },
    ];

    this.levels = [
      { label: 'Primaria', value: AcademicLevel.Primaria },
      { label: 'Secundaria', value: AcademicLevel.Secundaria },
      { label: 'Terciario', value: AcademicLevel.Terciario },
      { label: 'Universitario', value: AcademicLevel.Universitario },
      { label: 'Posgrado', value: AcademicLevel.Posgrado },
      { label: 'Master', value: AcademicLevel.Master },
      { label: 'Doctorado', value: AcademicLevel.Doctorado },
    ];

    this.createForm();

    if (this.config.data.selectedItem) {
      this.selectedItem = this.config.data.selectedItem;
      this.setData();
    }
  }

  createForm(): void {
    this.academicDataForm = this.formBuilder.group({
      centroEducativo: ['', Validators.required],
      nivel: [AcademicLevel.Primaria, Validators.required],
      estado: [AcademicStates.Cursando, Validators.required],
      mesDesde: ['', Validators.required],
      anioDesde: ['', Validators.required],
      mesHasta: ['', Validators.required],
      anioHasta: ['', Validators.required],
    });
  }

  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.academicDataForm.controls;
  }

  private setData(): void {
    this.academicDataForm.patchValue({
      centroEducativo: this.selectedItem.centroEducativo,
      nivel: this.selectedItem.nivel,
      estado: this.selectedItem.estado,
      mesDesde: this.selectedItem.mesDesde,
      anioDesde: this.selectedItem.anioDesde,
      mesHasta: this.selectedItem.mesHasta,
      anioHasta: this.selectedItem.anioHasta,
    });
  }

  onSubmit(): void {
    console.log(this.academicDataForm.value);
    this.submitted = true;
    if (this.academicDataForm.valid) {
      this.ref.close({ ...this.academicDataForm.value });
    }
  }

  handleChangeAnioDesde(anioDesde: string | number): void {
    this.anioHasta.refreshByYear(Number(anioDesde));
  }
}
