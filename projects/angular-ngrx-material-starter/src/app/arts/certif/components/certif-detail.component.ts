import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Certif } from '../certif';

@Component({
  selector: 'x-certif-detail',
  template: `
    <mat-card *ngIf="certif$ | async as certif">
      <mat-card-title-group>
        <mat-card-title>{{ certif.title }}</mat-card-title>
        <mat-card-subtitle *ngIf="certif.subtitle">{{
          certif.subtitle
        }}</mat-card-subtitle>
        <img
          mat-card-sm-image
          *ngIf="certif.thumbnail"
          [src]="certif.thumbnail"
        />
      </mat-card-title-group>
      <mat-card-content>
        <p [innerHtml]="certif.description"></p>
      </mat-card-content>
      <mat-card-footer class="footer"> Artist: Mist </mat-card-footer>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 75px 0;
      }
      mat-card {
        max-width: 600px;
      }
      mat-card-title-group {
        margin-left: 0;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin: 15px 0 50px;
      }
      mat-card-actions {
        margin: 25px 0 0 !important;
      }
      mat-card-footer {
        padding: 0 25px 25px;
        position: relative;
      }
    `
  ]
})
export class CertifDetailComponent {
  certif$: Observable<Certif>;
}
