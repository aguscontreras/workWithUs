import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AbmAcademicItemComponent } from '../abm-academic-item/abm-academic-item.component';

@Component({
  selector: 'app-academic-data',
  templateUrl: './academic-data.component.html',
  styleUrls: ['./academic-data.component.scss'],
  providers: [DialogService],
})
export class AcademicDataComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  openDialogAbmAcademicItem(): void {
    const ref = this.dialogService.open(AbmAcademicItemComponent, {
      header: 'Agregar formación académica',
    });
  }
}
