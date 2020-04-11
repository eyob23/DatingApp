import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
@Injectable({
  providedIn: 'root',
})
export class MemberListResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}
  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    return this.userService.getUsers().pipe(
      catchError((error) => {
        this.alertifyService.error('Problem retrieving data:' + error);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
