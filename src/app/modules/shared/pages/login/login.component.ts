import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }

    this.createLoginForm();
  }

  ngOnInit(): void {}

  private createLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl =
            //  this.route.snapshot.queryParams.get('returnUr') || '';
            this.route.snapshot.queryParamMap.get('returnUrl' || '');
          this.router.navigateByUrl(returnUrl);
        },

        error: (err: HttpErrorResponse) => {
          this.error = err.error;
          this.loading = false;
          console.error(err);
        },
      });
  }
}
