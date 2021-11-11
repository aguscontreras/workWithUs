import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AbmAcademicItemComponent } from '../abm-academic-item/abm-academic-item.component';
import { AcademicItem } from '../../../../_models/academicItem';
import { first } from 'rxjs/operators';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-academic-data',
  templateUrl: './academic-data.component.html',
  styleUrls: ['./academic-data.component.scss'],
  providers: [DialogService],
})
export class AcademicDataComponent implements OnInit {
  academicItems: AcademicItem[] = [];
  msgs: Message[] = [];
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.msgs = [
      {
        severity: 'info',
        summary: 'Nada por aquí.',
        detail: 'Aún no cargaste tu información académica.',
        closable: false,
      },
    ];
  }

  openDialogAbmAcademicItem(): void {
    const ref = this.dialogService.open(AbmAcademicItemComponent, {
      header: 'Agregar formación académica',
    });

    ref.onClose.pipe(first()).subscribe({
      next: (item: AcademicItem) => {
        if (item != null) {
          this.academicItems.push(item);
        }
      },
    });
  }
}
