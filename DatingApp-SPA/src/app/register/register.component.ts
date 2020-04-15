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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
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
    console.log(this.registerForm);
    // this.authService.register(this.model).subscribe(
    //   () => {
    //     this.alertifyService.success('registration is successfully');
    //   },
    //   (error) => {
    //     this.alertifyService.error(error);
    //   }
    // );
    console.log(this.registerForm.value);
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
