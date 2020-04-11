import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.model);
  }
  Login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertifyService.success('logged in successfully');
      },
      (error) => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
    console.log(this.model);
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    if (this.authService.logout()) {
      this.alertifyService.message('logged out successfully');
      this.router.navigate(['/home']);
    }
  }
}
