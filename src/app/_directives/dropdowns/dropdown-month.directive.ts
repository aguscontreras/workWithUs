import { Directive, EventEmitter, Host, OnInit, Output } from '@angular/core';
import { CustomStaticDropdown } from '../../_models';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';

@Directive({
  selector: '[appDropdownMonth]',
})
export class DropdownMonthDirective implements OnInit, CustomStaticDropdown {
  @Output() dataLoaded = new EventEmitter<SelectItem[]>();

  private data: SelectItem[] = [
    { label: 'Enero', value: '01' },
    { label: 'Febrero', value: '02' },
    { label: 'Marzo', value: '03' },
    { label: 'Abril', value: '04' },
    { label: 'Mayo', value: '05' },
    { label: 'Junio', value: '06' },
    { label: 'Julio', value: '07' },
    { label: 'Agosto', value: '08' },
    { label: 'Septiembre', value: '09' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];

  constructor(@Host() public pDropdown: Dropdown) {}

  ngOnInit(): void {
    this.setConfig();
    this.setData();
  }

  setConfig(): void {
    this.pDropdown.placeholder = 'Mes...';
  }

  setData(): void {
    this.pDropdown.options = this.data;
    this.dataLoaded.emit(this.data);
  }
}
