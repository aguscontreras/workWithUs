import { Component, Input, OnInit } from '@angular/core';
import { AcademicItem } from '../../../../_models';
import { DialogService } from 'primeng/dynamicdialog';
import { AbmAcademicItemComponent } from '../abm-academic-item/abm-academic-item.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-academic-list-item',
  templateUrl: './academic-list-item.component.html',
  styleUrls: ['./academic-list-item.component.scss'],
  styles: [
    '.wrapper{border: 1px solid #d4d4d8; border-radius: 0.375rem; margin-bottom: 1rem;}',
  ],
  providers: [ConfirmationService],
})
export class AcademicListItemComponent implements OnInit {
  @Input() academicItem: AcademicItem;

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  handleClickBtnEditItem(): void {
    this.dialogService.open(AbmAcademicItemComponent, {
      header: 'Editar formación académica',
      data: {
        selectedItem: this.academicItem,
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
