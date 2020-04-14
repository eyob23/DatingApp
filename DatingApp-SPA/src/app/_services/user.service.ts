import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { User } from './../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUr = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUr}users`);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUr}users/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUr}users/${user.id}`, user);
  }
  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      `${this.baseUr}users/${userId}/photos/${id}/setMain`,
      {}
    );
  }
  deletePhoto(userId: number, id: number) {
    return this.http.delete(`${this.baseUr}users/${userId}/photos/${id}/`);
  }
}
