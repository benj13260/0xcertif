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

import { Book } from '../models';

@Component({
  selector: 'bc-book-preview',
  template: `
    <a [routerLink]="['/arts/art', id]" [@openClose]="OpenEmitter$ | async">
      <!--[ngClass]="routeAnimationsElements"-->
      <mat-card>
        <mat-card-title-group>
          <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail" />
          <mat-card-title>{{ title | bcEllipsis: 35 }}</mat-card-title>
          <mat-card-subtitle *ngIf="subtitle">{{
            subtitle | bcEllipsis: 40
          }}</mat-card-subtitle>
        </mat-card-title-group>
        <mat-card-content>
          <p *ngIf="description">{{ description | bcEllipsis }}</p>
        </mat-card-content>
        <mat-card-footer>
          <bc-book-authors [book]="book"></bc-book-authors>
        </mat-card-footer>
      </mat-card>
    </a>
  `,
  styles: [
    `
      :host {
        display: flex;
      }

      :host a {
        display: flex;
      }

      mat-card {
        width: 400px;
        margin: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
      }

      @media only screen and (max-width: 768px) {
        mat-card {
          margin: 15px 0 !important;
        }
      }
      mat-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.5);
      }
      mat-card-title {
        margin-right: 10px;
      }
      mat-card-title-group {
        margin: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin-top: 15px;
        margin: 15px 0 0;
      }
      span {
        display: inline-block;
        font-size: 13px;
      }
      mat-card-footer {
        padding: 0 25px 25px;
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
export class BookPreviewComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  isOpen = 'closed';
  OpenEmitter$ = new BehaviorSubject<string>(this.isOpen);

  getRandom(): number {
    return Math.floor(Math.random() * 200 + 200);
  }

  ngOnInit(): void {
    of(null)
      .pipe(delay(this.getRandom()))
      .subscribe((v) => this.OpenEmitter$.next('open'));
  }

  ngOnDestroy(): void {
    of(null)
      .pipe(delay(this.getRandom()))
      .subscribe((v) => this.OpenEmitter$.next('close'));
  }

  @Input() book!: Book;

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }

    return false;
  }
}
