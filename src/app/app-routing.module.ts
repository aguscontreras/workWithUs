import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/shared/pages/login/login.component';
import { NotFoundComponent } from './modules/shared/pages/not-found/not-found.component';
import { HomeComponent } from './modules/shared/pages/home/home.component';
import { RegisterComponent } from './modules/shared/pages/register/register.component';
import { ForgotComponent } from './modules/shared/pages/forgot/forgot.component';
import { PostulantPanelComponent } from './modules/postulant/pages/postulant-panel/postulant-panel.component';
import { Role } from './_models';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  {
    path: 'postulant',
    component: PostulantPanelComponent,
    data: { roles: [Role.User] },
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
