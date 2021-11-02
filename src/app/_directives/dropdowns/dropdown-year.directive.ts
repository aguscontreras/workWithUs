import { ThisReceiver } from '@angular/compiler';
import { Directive, EventEmitter, Host, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { CustomStaticDropdown } from '../../_models';

@Directive({
  selector: '[appDropdownYear]',
})
export class DropdownYearDirective implements OnInit, CustomStaticDropdown {
  @Output() dataLoaded = new EventEmitter<SelectItem[]>();
  private data: SelectItem[] = [];
  private currentYear: number;
  private period = 75;

  constructor(@Host() public pDropdown: Dropdown) {}

  ngOnInit(): void {
    this.setConfig();
    this.currentYear = new Date().getFullYear();
    let from = this.currentYear - this.period;
    while (from <= this.currentYear) {
      this.data.push({ label: String(from), value: String(from) });
      from++;
    }
    this.setData();
  }

  setConfig(): void {
    this.pDropdown.placeholder = 'Año...';
  }

  setData(): void {
    this.pDropdown.options = this.data;
    this.dataLoaded.emit(this.data);
  }

  refreshByYear(year: number): void {
    this.data = [];
    while (year <= this.currentYear) {
      this.data.push({ label: String(year), value: String(year) });
      year++;
    }

    this.setData();
  }
}
