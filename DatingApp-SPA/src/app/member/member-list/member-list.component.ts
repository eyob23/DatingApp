import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../_models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadUsers();
    this.route.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
    });
  }
  // loadUsers() {
  //   this.subscription = this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     },
  //     (error) => {
  //       this.alertifyService.error(error);
  //     }
  //   );
  // }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
