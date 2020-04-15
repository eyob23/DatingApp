import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { DecodedToken } from './../_models/decodedToken';
import { User } from './../_models/user';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUser = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  constructor(private http: HttpClient) {}
  login(model: any) {
    return this.http.post(this.baseUser + 'login', model).pipe(
      retry(2),
      map((response: any) => {
        const token = response.token;
        const user = response.user;
        if (token) {
          localStorage.setItem('token', token);
        }
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }
  register(user: User) {
    return this.http.post(this.baseUser + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getCurrentUser(): User {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user;
  }
  get token() {
    return localStorage.getItem('token');
  }
  get decodedToken(): DecodedToken {
    return this.jwtHelper.decodeToken(this.token);
  }
}
