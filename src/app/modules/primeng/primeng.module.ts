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
  ],
})
export class PrimengModule {}
