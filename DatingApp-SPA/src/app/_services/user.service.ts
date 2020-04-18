import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Pagination } from './../_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUr = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(
    page?: number,
    itemsPerPage?: number,
    userParams?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();
    if (page !== null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
    }
    return this.http
      .get<User[]>(`${this.baseUr}users`, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
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
