import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authenticationService.user$.subscribe({
      next: (user) => {
        this.isUserLoggedIn = user != null;
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onClickBtnRegistrar(): void {
    this.router.navigate(['/register']);
  }

  onClickBtnIngresar(): void {
    this.router.navigate(['/login']);
  }
}
