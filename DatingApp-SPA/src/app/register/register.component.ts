import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { User } from './../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-blue',
    };
    this.createRegisterForm();
    // this.registerForm = new FormGroup(
    //   {
    //     username: new FormControl('', Validators.required),
    //     password: new FormControl('', [
    //       Validators.required,
    //       Validators.minLength(4),
    //       Validators.maxLength(8),
    //     ]),
    //     confirmPassword: new FormControl('', Validators.required),
    //   },
    //   this.passwordMatchValidator
    // );
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
    }
    this.authService.register(this.user).subscribe(
      () => {
        this.alertifyService.success('Registration is successfully');
      },
      (error) => {
        this.alertifyService.error(error);
      },
      () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      }
    );
  }
  cancel() {
    this.alertifyService.message('cancelled');
    this.cancelRegister.emit(false);
  }

  passwordMatchValidator(g: FormGroup) {
    console.log('mismatch validator');
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }
  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: [''],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: [this.passwordMatchValidator] }
    );
  }
}
