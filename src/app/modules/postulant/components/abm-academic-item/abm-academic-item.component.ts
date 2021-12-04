import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';
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
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-abm-academic-item',
  templateUrl: './abm-academic-item.component.html',
  styleUrls: ['./abm-academic-item.component.scss'],
})
export class AbmAcademicItemComponent implements OnInit, OnDestroy {
  states: SelectItem[];
  levels: SelectItem[];
  academicDataForm: FormGroup;
  submitted: boolean;

  @ViewChild('anioHasta', { read: DropdownYearDirective })
  private anioHasta: DropdownYearDirective;

  @Output() cancelarItem = new EventEmitter();
  @Output() nuevoItem = new EventEmitter<AcademicItem>();

  private _selectedItem: AcademicItem;
  @Input() set selectedItem(item: AcademicItem) {
    if (typeof item !== 'undefined') {
      this._selectedItem = item;
      this.setData(this._selectedItem);
    }
  }

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
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
  }

  ngOnDestroy(): void {}

  createForm(): void {
    this.academicDataForm = this.formBuilder.group({
      centroEducativo: ['', Validators.required],
      nivel: [AcademicLevel.Primaria, Validators.required],
      estado: [AcademicStates.Cursando, Validators.required],
      mesDesde: ['', Validators.required],
      anioDesde: ['', Validators.required],
      mesHasta: [{ value: '', disabled: true }],
      anioHasta: [{ value: '', disabled: true }],
    });
  }

  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.academicDataForm.controls;
  }

  private setData(selected: AcademicItem): void {
    this.academicDataForm.patchValue({
      centroEducativo: selected.centroEducativo,
      nivel: selected.nivel,
      estado: selected.estado,
      mesDesde: selected.mesDesde,
      anioDesde: selected.anioDesde,
      mesHasta: selected.mesHasta,
      anioHasta: selected.anioHasta,
    });

    this.setStatusPeriodoHasta();
  }

  onSubmit(): void {
    console.log(this.academicDataForm.value);
    this.submitted = true;
    if (this.academicDataForm.valid) {
      this.nuevoItem.emit({ ...this.academicDataForm.value });
    }
  }

  handleChangeAnioDesde(anioDesde: string | number): void {
    this.anioHasta.refreshByYear(Number(anioDesde));
  }

  handleChangeEstado(): void {
    this.setStatusPeriodoHasta();
  }

  private setStatusPeriodoHasta(): void {
    if (this.f.estado.value !== AcademicStates.Cursando) {
      this.f.mesHasta.enable();
      this.f.anioHasta.enable();
      this.f.mesHasta.setValidators(Validators.required);
      this.f.anioHasta.setValidators(Validators.required);
      this.f.mesHasta.updateValueAndValidity();
      this.f.anioHasta.updateValueAndValidity();
    } else {
      this.f.mesHasta.disable();
      this.f.anioHasta.disable();
    }
  }
}
