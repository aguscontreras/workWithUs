import { EventEmitter } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';

export interface CustomStaticDropdown {
  pDropdown: Dropdown;
  dataLoaded?: EventEmitter<any>;
  setConfig(): void;
  setData(): void;
}
