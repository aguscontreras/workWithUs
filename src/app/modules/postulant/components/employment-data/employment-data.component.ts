import { Component, OnInit } from '@angular/core';
import { EmploymentItem } from '../../../../_models/employmentItem';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-employment-data',
  templateUrl: './employment-data.component.html',
  styleUrls: ['./employment-data.component.scss'],
})
export class EmploymentDataComponent implements OnInit {
  employmentItems: EmploymentItem[] = [];
  selectedItem: EmploymentItem;
  addingItem: boolean;
  msgs: Message[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setEmptyMessage();
  }

  setEmptyMessage(): void {
    if (!this.employmentItems.length) {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Nada por aquí.',
          detail: 'Aún no cargaste tu información académica.',
          closable: false,
        },
      ];
    }
  }

  handleClickBtnNewItem(): void {
    if (!this.addingItem) {
      this.addingItem = true;
      this.msgs = [];
    }
  }

  handleNewItem(newItem: EmploymentItem): void {
    console.log(newItem);
    if (newItem) {
      this.employmentItems.push({ ...newItem });
      this.addingItem = false;
    }
  }
}
