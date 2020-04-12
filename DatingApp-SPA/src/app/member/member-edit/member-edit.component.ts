import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  HostListener,
} from '@angular/core';
import { User } from './../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from './../../_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit, OnChanges {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  user: User;
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }
  updateUser() {
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(
      (user: User) => {
        this.alertifyService.success('Profile updated successfully!');
        this.editForm.reset(this.user);
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }
  ngOnChanges() {}
}
