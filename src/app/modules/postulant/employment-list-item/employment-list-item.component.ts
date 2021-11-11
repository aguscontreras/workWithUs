import { Component, Input, OnInit } from '@angular/core';
import { EmploymentItem } from '../../../_models/employmentItem';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { AbmEmploymentItemComponent } from '../components/abm-employment-item/abm-employment-item.component';

@Component({
  selector: 'app-employment-list-item',
  templateUrl: './employment-list-item.component.html',
  styleUrls: ['./employment-list-item.component.scss'],
  styles: [
    '.wrapper{border: 1px solid #d4d4d8; border-radius: 0.375rem; margin-bottom: 1rem;}',
  ],
  providers: [DialogService],
})
export class EmploymentListItemComponent implements OnInit {
  @Input() employmentItem: EmploymentItem;

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  handleClickBtnEditItem(): void {
    this.dialogService.open(AbmEmploymentItemComponent, {
      header: 'Editar formación académica',
      data: {
        selectedItem: this.employmentItem,
      },
    });
  }

  handleClickBtnDeleteItem(): void {
    this.confirmationService.confirm({
      header: 'Quitar item',
      icon: 'pi pi-exclamation-circle',
      message:
        '¿Estás seguro de quitar este item? Esta acción no se puede deshacer.',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      key: 'deleteItem',
    });
  }
}
