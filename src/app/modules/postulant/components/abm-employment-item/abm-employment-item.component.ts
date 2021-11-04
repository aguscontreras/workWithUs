import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import {
  AbstractControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DropdownYearDirective } from 'src/app/_directives/dropdowns/dropdown-year.directive';

@Component({
  selector: 'app-abm-employment-item',
  templateUrl: './abm-employment-item.component.html',
  styleUrls: ['./abm-employment-item.component.scss'],
})
export class AbmEmploymentItemComponent implements OnInit {
  employmentDataForm: FormGroup;
  submitted: boolean;
  sectorEmpresa: SelectItem[];
  @ViewChild('anioHasta', { read: DropdownYearDirective })
  private anioHasta: DropdownYearDirective;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    this.config.width = '75%';
    this.config.dismissableMask = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.employmentDataForm = this.formBuilder.group({
      cargo: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      sectorEmpresa: [''],
      ubicacion: [''],
      mesDesde: ['', Validators.required],
      anioDesde: ['', Validators.required],
      mesHasta: ['', Validators.required],
      anioHasta: ['', Validators.required],
      trabajaActualmente: [false],
    });
  }

  get f() {
    return this.employmentDataForm.controls;
  }

  onSubmit(): void {
    console.log(this.employmentDataForm.value);
    this.submitted = true;
    if (this.employmentDataForm.valid) {
      this.ref.close({ ...this.employmentDataForm.value });
    }
  }

  handleChangeCheckTrabajaActualmente(checked: boolean): void {
    if (checked) {
      this.f.mesHasta.disable();
      this.f.anioHasta.disable();
      this.f.mesHasta.clearValidators();
      this.f.anioHasta.clearValidators();
    } else {
      this.f.mesHasta.enable();
      this.f.anioHasta.enable();
      this.f.mesHasta.setValidators(Validators.required);
      this.f.anioHasta.setValidators(Validators.required);
      this.f.mesHasta.updateValueAndValidity();
      this.f.anioHasta.updateValueAndValidity();
    }

    console.log(this.f.trabajaActualmente.value);
  }

  handleChangeAnioDesde(anioDesde: string | number): void {
    this.anioHasta.refreshByYear(Number(anioDesde));
  }
}
