import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, PanelModule, InputTextModule, ButtonModule],
  exports: [PanelModule, InputTextModule, ButtonModule],
})
export class PrimengModule {}
