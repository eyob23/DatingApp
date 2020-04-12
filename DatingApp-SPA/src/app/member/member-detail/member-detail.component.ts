import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }
  // loadUser() {
  //   const paramName = 'id';
  //   const id: number = +this.route.snapshot.params[paramName];
  //   this.subscription = this.userService.getUser(id).subscribe(
  //     (user) => {
  //       this.user = user;
  //     },
  //     (error) => {
  //       this.alertifyService.error(error);
  //     }
  //   );
  // }
  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
  getImages(): NgxGalleryImage[] {
    const imageUrls: NgxGalleryImage[] = [];
    for (const photo of this.user.photos) {
      imageUrls.push(
        new NgxGalleryImage({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description,
        })
      );
    }
    return imageUrls;
  }
}
