import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  email: string;
  constructor(private router: Router) {}

  onClickBtnRegistrar(): void {
    this.goToRegisterPage();
  }

  onEnterInput(): void {
    this.goToRegisterPage();
  }

  private goToRegisterPage(): void {
    this.router.navigate(['/register'], {
      queryParams: { email: this.email },
    });
  }
}
