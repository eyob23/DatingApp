import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { environment } from './../../../environments/environment';
import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() mainPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {
    this.hasBaseDropZoneOver = false;

    // this.response = '';

    // this.uploader.response.subscribe((res) => (this.response = res));
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/${this.authService.decodedToken.nameid}/photos`,
      authToken: `Bearer ${this.authService.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10485760,
      // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      // formatDataFunctionIsAsync: true,
      // formatDataFunction: async (item) => {
      //   return new Promise((resolve, reject) => {
      //     resolve({
      //       name: item._file.name,
      //       length: item._file.size,
      //       contentType: item._file.type,
      //       date: new Date(),
      //     });
      //   });
      // },
    });
    this.uploader.onAfterAddingFile = (file) => (file.withCredentials = false);
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo: Photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.mainPhotoChange.emit(photo.url);
          const currentUser = this.authService.getCurrentUser();
          currentUser.photoUrl = photo.url;
          this.authService.setCurrentUser(currentUser);
        }
      }
    };
  }

  ngOnInit() {
    this.initializeUploader();
  }
  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(+this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMainPhoto = this.photos.filter(
            (p) => p.isMain === true
          )[0];
          this.currentMainPhoto.isMain = false;
          // this.photos.filter((p) => p.id === photo.id)[0].isMain = true;
          photo.isMain = true;
          this.alertifyService.success(
            'Successfully changed main profile picture'
          );
          this.mainPhotoChange.emit(photo.url);
          const currentUser = this.authService.getCurrentUser();
          currentUser.photoUrl = photo.url;
          this.authService.setCurrentUser(currentUser);
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }
  deletePhoto(photo: Photo) {
    this.alertifyService.confirm(
      'Are you sure you want to delete the photo?',
      () => {
        this.userService
          .deletePhoto(+this.authService.decodedToken.nameid, photo.id)
          .subscribe(
            () => {
              this.photos = this.photos.filter((p) => p.id !== photo.id);
              this.alertifyService.success('Photo successfully deleted');
            },
            (error) => {
              this.alertifyService.error(error);
            }
          );
      }
    );
  }
}
