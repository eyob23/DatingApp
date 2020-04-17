import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../_models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Pagination } from './../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  pagination: Pagination;
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadUsers();
    this.route.data.subscribe((data: { users: PaginatedResult<User[]> }) => {
      console.log(data);
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
  }
  loadUsers() {
    this.subscription = this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (result: PaginatedResult<User[]>) => {
          this.users = result.result;
          this.pagination = result.pagination;
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
