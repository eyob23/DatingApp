import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(
      'Confirm',
      message,
      (e: any) => {
        if (e) {
          okCallback();
        } else {
        }
      },
      null
    );
  }

  success(message: string) {
    alertify.success('Success', message);
  }

  error(message: string) {
    alertify.error('Error', message);
  }
  warning(message: string) {
    alertify.warning('Warning', message);
  }
  message(message: string) {
    alertify.message('Message', message);
  }
}
