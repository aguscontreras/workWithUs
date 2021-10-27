import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Role } from '../_models/role';
import { delay, dematerialize, materialize } from 'rxjs/operators';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { User } from '../_models';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const {
      url,
      method,
      headers,
      body,
    }: { url: string; method: string; headers: any; body: any } = request;

    // return next.handle(request);
    return handleRoute();

    function handleRoute(): Observable<HttpEvent<any>> {
      switch (true) {
        case url.endsWith('users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('users/register') && method === 'POST':
          return register();
        case url.endsWith('users/restorePassword') && method === 'POST':
          return restorePassword();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          return next.handle(request);
      }
    }

    function authenticate(): Observable<HttpResponse<unknown>> {
      const { username, password } = body;
      const users: User[] = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (x) => x.username === username && x.password === password
      );

      if (!user) {
        console.error('Usuario o contraseña incorrectos');
        return error('Usuario o contraseña incorrectos');
      }

      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`,
      });
    }

    function register(): Observable<HttpResponse<unknown>> {
      const { username, password } = body;

      if (isRegistered(username)) {
        return error('La cuenta de correo electrónico ya está registrada.');
      }

      const currentUsers: User[] = JSON.parse(localStorage.getItem('users'));
      const newUser = new User(username, password, Role.User);
      currentUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(currentUsers));

      return ok({
        ...newUser,
        token: `fake-jwt-token.${newUser.id}`,
      });
    }

    function restorePassword(): Observable<HttpResponse<unknown>> {
      const { username } = body;
      if (!isRegistered(username)) {
        return error('La cuenta de correo electrónico no está registrada.');
      }

      return ok(1);
    }

    function getUsers(): Observable<HttpResponse<unknown>> {
      if (!isAdmin()) {
        return unauthorized();
      }

      const users: User[] = JSON.parse(localStorage.getItem('users')) || [];
      return ok(users);
    }

    function getUserById(): Observable<HttpResponse<unknown>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      if (!isAdmin() && currentUser().id !== idFromUrl()) {
        return unauthorized();
      }

      const users: User[] = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((x) => x.id === idFromUrl());
      return ok(user);
    }

    function ok(resp: unknown): Observable<HttpResponse<unknown>> {
      return of(new HttpResponse({ status: 200, body: resp })).pipe(
        materialize(),
        delay(500),
        dematerialize()
      );
    }

    function error(err: string): Observable<HttpResponse<unknown>> {
      return throwError({ status: 400, error: err }).pipe(
        materialize(),
        delay(500),
        dematerialize()
      );
    }

    function unauthorized(): Observable<never> {
      return throwError({
        status: 401,
        error: { message: 'unauthorized' },
      }).pipe(materialize(), delay(500), dematerialize());
    }

    function isLoggedIn(): boolean {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin(): boolean {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    function isRegistered(username: string): boolean {
      const users: User[] = JSON.parse(localStorage.getItem('users')) || [];
      return users.find((x) => x.username === username) != null;
    }

    function currentUser(): any {
      if (!isLoggedIn()) {
        return;
      }
      const id = parseInt(headers.get('Authorization').split('.')[1], 10);
      const users: User[] = JSON.parse(localStorage.getItem('users')) || [];
      return users.find((x) => x.id === id);
    }

    function idFromUrl(): number {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 10);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true,
};
