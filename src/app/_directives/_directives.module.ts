import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../modules/primeng/primeng.module';
import { DropdownMonthDirective } from './dropdowns/dropdown-month.directive';
import { DropdownYearDirective } from './dropdowns/dropdown-year.directive';

@NgModule({
  declarations: [DropdownMonthDirective, DropdownYearDirective],
  imports: [CommonModule, PrimengModule],
  exports: [DropdownMonthDirective, DropdownYearDirective],
})
export class DirectivesModule {}
