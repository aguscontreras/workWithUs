import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Role } from '../../../../_models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  loading: boolean;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [Role.User],
    });

    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.f.username.setValue(params.get('email'));
      },
    });
  }

  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.formRegister.controls;
  }

  onSubmit(): void {
    console.log(this.formRegister.value);

    if (!this.formRegister.valid) {
      return;
    }

    this.loading = true;

    this.authenticationService
      .signUp(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (result) => {
          console.log(result);

          const { username, password } = result;
          this.loginUser(username, password);
        },

        error: (err) => {
          this.error = err;
          this.loading = false;
          console.error(err);
        },
      });
  }

  private loginUser(username: string, password: string): void {
    this.authenticationService
      .login(username, password)
      .pipe(first())
      .subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        },
      });
  }
}
