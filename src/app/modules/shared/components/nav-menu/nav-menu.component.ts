import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';

interface NavMenu {
  label: string;
  url: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  navMenu: NavMenu[];

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    console.log(this.authenticationService.userValue);

    this.navMenu = [
      { label: 'Empleos', url: 'jobs' },
      { label: 'Mi currículum', url: 'postulant' },
      { label: 'Mis postulaciones', url: 'applications' },
    ];
  }
}
