import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DropdownYearDirective } from 'src/app/_directives/dropdowns/dropdown-year.directive';
import { EmploymentItem } from '../../../../_models/employmentItem';

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

  private _selectedItem: EmploymentItem;
  @Input() set selectedItem(item: EmploymentItem) {
    if (typeof item !== 'undefined') {
      this._selectedItem = item;
      this.setData(this._selectedItem);
    }
  }

  @Output() cancelarItem = new EventEmitter<any>();
  @Output() nuevoItem = new EventEmitter<EmploymentItem>();

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.employmentDataForm = this.formBuilder.group({
      cargo: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      sectorEmpresa: [''],
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

  private setData(selected: EmploymentItem): void {
    this.employmentDataForm.patchValue({
      cargo: selected.cargo,
      nombreEmpresa: selected.nombreEmpresa,
      sectorEmpresa: selected.sectorEmpresa,
      mesDesde: selected.mesDesde,
      anioDesde: selected.anioDesde,
      mesHasta: selected.mesHasta,
      anioHasta: selected.anioHasta,
      trabajaActualmente: selected.trabajaActualmente,
    });

    this.setStatusPeriodoHasta(selected.trabajaActualmente);
  }

  onSubmit(): void {
    console.log(this.employmentDataForm.value);
    this.submitted = true;

    if (this.employmentDataForm.valid) {
      //  this.ref.close({ ...this.employmentDataForm.value });
      this.nuevoItem.emit({ ...this.employmentDataForm.value });
    }
  }

  handleChangeCheckTrabajaActualmente(checked: boolean): void {
    this.setStatusPeriodoHasta(checked);
  }

  private setStatusPeriodoHasta(enabled: boolean): void {
    if (enabled) {
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
  }

  handleChangeAnioDesde(anioDesde: string | number): void {
    this.anioHasta.refreshByYear(Number(anioDesde));
  }
}
