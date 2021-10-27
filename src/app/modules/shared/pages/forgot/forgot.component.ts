import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  providers: [MessageService],
})
export class ForgotComponent implements OnInit {
  username = new FormControl('', [Validators.required, Validators.email]);
  error: string;
  loading: boolean;
  routeSubscription: Subscription;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParamMap.subscribe({
      next: (params) => {
        this.username.setValue(params.get('email'));
      },
    });
  }

  onClickBtnEnviar(): void {
    console.log(this.username.value);

    this.submitted = true;
    this.messageService.clear();

    if (this.username.invalid) {
      return;
    }

    this.authenticationService
      .restorePassword(this.username.value)
      .pipe(first())
      .subscribe({
        next: (result) => {
          if (result === 1) {
            this.messageService.add({
              severity: 'success',
              summary: 'Correo enviado',
              detail: 'Revisa tu casilla de correo electrónico',
              life: 7000,
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = err.error;
        },
      });
  }
}
