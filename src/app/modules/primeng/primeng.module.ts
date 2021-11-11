import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessagesModule,
    ToastModule,
    TabViewModule,
    DropdownModule,
    SelectButtonModule,
    DialogModule,
    DynamicDialogModule,
    CardModule,
    ConfirmDialogModule,
    CheckboxModule,
  ],
  exports: [
    PanelModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    TabViewModule,
    DropdownModule,
    SelectButtonModule,
    DialogModule,
    DynamicDialogModule,
    CardModule,
    ConfirmDialogModule,
    CheckboxModule,
  ],

  providers: [ConfirmationService],
})
export class PrimengModule {}
