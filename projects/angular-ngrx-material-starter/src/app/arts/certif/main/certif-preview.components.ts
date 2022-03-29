import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Certif } from '../certif';

@Component({
  selector: 'x-certif-preview',
  template: `
    <a
      *ngIf="certif.volumeInfo != null"
      [routerLink]="['/nfts', certif.id]"
      [@openClose]="OpenEmitter$ | async"
    >
      <mat-card class="example-card">
        <div *ngIf="load">loading...</div>
        <div *ngIf="load">loaded</div>
        <div #img class="img" (load)="display()">
          <img mat-card-image src="{{ certif.volumeInfo?.imageLinks?.full }}" />
        </div>
        <mat-card-content>
          <p>
            <span
              ><i>{{ certif.volumeInfo?.galleries[0] }}</i></span
            >
            <span
              ><b>{{ certif.volumeInfo?.artists[0] }}</b></span
            >
            <span>{{ certif.volumeInfo?.title }}</span>
            <span class="right">$</span>
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

      .example-card:hover {
        background-color: silver;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      }

      @media only screen and (max-width: 768px) {
        mat-card {
          margin: 15px 0 !important;
        }
      }

      mat-card-actions {
        position: absolute;
        bottom: 25px;
        left: 30%;
      }

      mat-card {
        margin: 10px;
        border-radius: 15px;
      }

      mat-card-content {
        margin-bottom: 50px;
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
        position: relative;
        bottom: 22px;
      }

      .img {
        min-height: 80%;
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

  load: boolean = false;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  isOpen = 'closed';
  OpenEmitter$ = new BehaviorSubject<string>(this.isOpen);

  getRandom(): number {
    return Math.floor(Math.random() * 200 + 200);
  }

  display(): void {
    this.load = true;
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
