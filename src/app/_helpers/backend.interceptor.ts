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

//  let users = JSON.parse(localStorage.getItem('users')) || [];

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: Role.Admin,
  },
  {
    id: 2,
    username: 'recruiter',
    password: 'recruiter',
    firstName: 'Recruiter',
    lastName: 'User',
    role: Role.Recruiter,
  },
  {
    id: 3,
    username: 'postulante',
    password: 'postulante',
    firstName: 'Postulante',
    lastName: 'User',
    role: Role.User,
  },
];

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
      const user = users.find(
        (x) => x.username === username && x.password === password
      );

      if (!user) {
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

    function getUsers(): Observable<HttpResponse<unknown>> {
      if (!isAdmin()) {
        return unauthorized();
      }

      return ok(users);
    }

    function getUserById(): Observable<HttpResponse<unknown>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      if (!isAdmin() && currentUser().id !== idFromUrl()) {
        return unauthorized();
      }

      const user = users.find((x) => x.id === idFromUrl());
      return ok(user);
    }

    function ok(resp: unknown): Observable<HttpResponse<unknown>> {
      return of(new HttpResponse({ status: 200, body: resp }));
    }

    function error(err: string): Observable<HttpResponse<unknown>> {
      return throwError({ status: 400, error: { err } }).pipe(
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

    function currentUser(): any {
      if (!isLoggedIn()) {
        return;
      }
      const id = parseInt(headers.get('Authorization').split('.')[1], 10);
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
