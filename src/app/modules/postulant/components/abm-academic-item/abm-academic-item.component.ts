import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-abm-academic-item',
  templateUrl: './abm-academic-item.component.html',
  styleUrls: ['./abm-academic-item.component.scss'],
})
export class AbmAcademicItemComponent implements OnInit {
  states: { label: string; value: string }[];

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.config.width = '65%';
  }

  ngOnInit(): void {
    this.states = [
      { label: 'Culminado', value: 'CUL' },
      { label: 'Cursando', value: 'CUR' },
      { label: 'Aplazado', value: 'APL' },
    ];
  }
}
