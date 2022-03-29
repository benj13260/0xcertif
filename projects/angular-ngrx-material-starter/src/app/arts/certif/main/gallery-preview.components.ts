import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { randomInt } from 'crypto';
import { BehaviorSubject, fromEvent, interval, of } from 'rxjs';
import { debounce, delay, map } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { Certif, Gallery } from '../certif';

@Component({
  selector: 'x-gallery-preview',
  template: `
    <a
      [routerLink]="['/nft/', contractAddr]"
      [@openClose]="OpenEmitter$ | async"
    >
      <mat-card class="example-card">
        <mat-card-header class="header">
          <div
            class="avatar"
            mat-card-avatar
            style.background-image="url({{ imagePerso }})"
          ></div>
          <div class="header-text">
            <mat-card-title>{{ title }}</mat-card-title>
            <mat-card-subtitle>{{ owner }}</mat-card-subtitle>
          </div>
          <div class="address">
            <div>
              Address: <i>0x95ab81bc1532c8a696d89365f2e6f76a404fe4df</i>
            </div>
            <div>
              Collection: <i>0x54cCbd37fc2d4a1cedC9Ee3ef3BDe315ECCd909c</i>
            </div>
          </div>
        </mat-card-header>
        <img mat-card-image [src]="imageCover" />
        <mat-card-content>
          <p *ngIf="descriptionTitle">
            <b>{{ descriptionTitle }}</b>
          </p>
          <p *ngFor="let desc of descriptionDetail">{{ desc }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>SHARE</button>
        </mat-card-actions>
      </mat-card>
    </a>
  `,
  styles: [
    `
      :host {
      }

      :host a {
        display: flex;
      }

      .example-card {
        max-width: 800px;
      }

      @media only screen and (max-width: 768px) {
        mat-card {
          margin: 15px 0 !important;
        }
      }

      mat-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.5);
      }

      mat-card-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      mat-card {
        margin: 10px;
      }

      mat-card-content {
        margin-bottom: 5px;
      }

      .header {
        padding-bottom: 10px;
      }
      .avatar {
        background: round;
        height: 80px;
        width: 80px;
        background-size: cover;
      }
      .header-text {
        margin-top: 7px;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      p {
        padding-left: 5px;
      }
      span {
        display: table;
        font-size: 15px;
      }
      .right {
        margin-left: auto;
      }
      .address {
        position: relative;
        margin-left: auto;
        margin-top: 10px;
      }
    `
  ],
  animations: [
    trigger('openClose', [
      state('closed', style({ transform: 'translateY(10%)', opacity: 0 })),
      state('open', style({ transform: 'translateY(0%)', opacity: 1 })),
      transition('open => closed', [animate('0.75s ease-in-out')]),
      transition('closed => open', [animate('0.75s ease-in-out')])
    ])
  ]
})
export class GalleryPreviewComponent implements OnInit {
  @Input() gallery!: Gallery;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  isOpen = 'closed';
  OpenEmitter$ = new BehaviorSubject<string>(this.isOpen);

  ngOnInit(): void {
    of(null)
      .pipe(delay(Math.floor(Math.random() * 200 + 200)))
      .subscribe((v) => this.OpenEmitter$.next('open'));
  }

  get id() {
    return this.gallery.id;
  }

  get title() {
    return this.gallery.volumeInfo.title;
  }
  get owner() {
    return this.gallery.volumeInfo.owner;
  }
  get style() {
    return this.gallery.volumeInfo.style;
  }
  get descriptionTitle() {
    return this.gallery.volumeInfo.description.title;
  }
  get descriptionDetail() {
    return this.gallery.volumeInfo.description.detail;
  }
  get imagePerso() {
    let res = this.gallery.volumeInfo.image.perso;
    if (res === null || res === undefined) {
      res =
        'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png';
    }
    console.log(res);
    return res;
  }
  get imageCover() {
    return this.gallery.volumeInfo.image.cover;
  }

  get contractAddr() {
    return this.gallery.volumeInfo.contractAddr;
  }
}
