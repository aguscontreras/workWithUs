import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [NotFoundComponent, LoginComponent],
  imports: [CommonModule, PrimengModule],
})
export class SharedModule {}
