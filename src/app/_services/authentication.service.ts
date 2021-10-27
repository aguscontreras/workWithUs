import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models';
import { map, tap } from 'rxjs/operators';
import { Role } from '../_models/role';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.setDefaultUsers();

    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );

    this.user$ = this.userSubject.asObservable();
  }

  private setDefaultUsers(): void {
    if (!localStorage.getItem('users')) {
      const defaultUsers: User[] = [];
      const admin = new User('admin', 'admin', Role.Admin);
      const recruiter = new User('recruiter', 'recruiter', Role.Recruiter);
      const postulante = new User('postulante', 'postulante', Role.User);
      admin.id = 1;
      recruiter.id = 2;
      postulante.id = 3;

      defaultUsers.push(admin, recruiter, postulante);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  signUp(username: string, password: string): Observable<User> {
    return this.http
      .post<any>(`${environment.apiUrl}/users/register`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          console.log({ ...user });
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  restorePassword(username: string): Observable<number> {
    return this.http.post<any>(`${environment.apiUrl}/users/restorePassword`, {
      username,
    });
  }
}
