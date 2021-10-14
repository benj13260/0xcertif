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

import { Certif } from '../certif';

@Component({
  selector: 'x-certif-preview',
  template: `
    <a
      [routerLink]="['/arts/art', certif.id]"
      [@openClose]="OpenEmitter$ | async"
    >
      <mat-card class="example-card">
        <img mat-card-image src="{{ certif.volumeInfo.imageLinks.full }}" />
        <mat-card-content>
          <p>
            <span><i>Kolly Gallery</i></span>
            <span><b>Mist</b> - El diablo</span>
            <span class="right">100'000 $</span>
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>BUY</button>
          <button mat-button>SHARE</button>
        </mat-card-actions>
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

      .example-card {
        max-width: 350px;
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
        border-radius: 15px;
      }

      mat-card-content {
        margin-bottom: 5px;
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
export class CertifPreviewComponent implements OnInit, OnDestroy {
  @Input() certif!: Certif;

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
}
