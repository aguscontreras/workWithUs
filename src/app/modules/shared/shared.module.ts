import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { AcademicLevelPipe } from './pipes/academic-level.pipe';
import { AcademicStatePipe } from './pipes/academic-state.pipe';
import { MonthPipe } from './pipes/month.pipe';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    NavMenuComponent,
    ForgotComponent,
    AcademicLevelPipe,
    AcademicStatePipe,
    MonthPipe,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [NavbarComponent, AcademicLevelPipe, AcademicStatePipe, MonthPipe],
})
export class SharedModule {}
