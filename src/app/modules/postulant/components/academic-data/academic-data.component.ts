import { Component, OnInit } from '@angular/core';
import { AcademicItem } from '../../../../_models/academicItem';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-academic-data',
  templateUrl: './academic-data.component.html',
  styleUrls: ['./academic-data.component.scss'],
})
export class AcademicDataComponent implements OnInit {
  academicItems: AcademicItem[] = [];
  selectedItem: AcademicItem;
  addingItem: boolean;
  msgs: Message[] = [];
  constructor() {}

  ngOnInit(): void {
    this.setEmptyMessage();
  }

  setEmptyMessage(): void {
    if (!this.academicItems.length) {
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

  handleEvtEditItem(item: AcademicItem): void {
    this.selectedItem = item;
    this.addingItem = true;
  }

  handleNewItem(newItem: AcademicItem): void {
    if (newItem) {
      this.academicItems.push({ ...newItem });
      this.addingItem = false;
    }
  }
}
