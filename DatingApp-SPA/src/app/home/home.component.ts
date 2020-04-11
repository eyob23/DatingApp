import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  values: any = {};
  registerMode = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/members']);
    }
    this.getValues();
  }
  registerToggle() {
    this.registerMode = true;
  }
  getValues() {
    this.http.get('http://localhost:5000/api/Values/').subscribe(
      (response) => {
        console.log(response);
        this.values = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
