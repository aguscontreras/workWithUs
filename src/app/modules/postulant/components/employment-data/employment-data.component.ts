import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AbmEmploymentItemComponent } from '../abm-employment-item/abm-employment-item.component';
import { first } from 'rxjs/operators';
import { EmploymentItem } from '../../../../_models/employmentItem';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-employment-data',
  templateUrl: './employment-data.component.html',
  styleUrls: ['./employment-data.component.scss'],
  providers: [DialogService],
})
export class EmploymentDataComponent implements OnInit {
  employmentItems: EmploymentItem[] = [];
  msgs: Message[] = [];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.msgs = [
      {
        severity: 'info',
        summary: 'Nada por aquí.',
        detail: 'Aún no cargaste tu experiencia laboral.',
        closable: false,
      },
    ];
  }

  handleClickBtnNewItem(): void {
    const ref = this.dialogService.open(AbmEmploymentItemComponent, {
      header: 'Agregar experiencia laboral',
    });

    ref.onClose.pipe(first()).subscribe({
      next: (item) => {
        if (item != null) {
          this.employmentItems.push(item);
        }
      },
    });
  }
}
