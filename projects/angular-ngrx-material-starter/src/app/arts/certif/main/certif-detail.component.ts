import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Certif } from '../certif';
import { selectCertif } from '../certif.actions';
import { selectSelectedCertif } from '../certif.reducer';

@Component({
  selector: 'x-certif-detail',
  template: `
    <mat-card class="example-card" *ngIf="certif$ | async as certif">
      <img mat-card-image src="{{ certif.volumeInfo?.imageLinks?.full }}" />
      <mat-card-content>
        <p>
          <span
            ><i>{{ certif.volumeInfo?.galleries[0] }}</i></span
          >
          <span
            ><b>{{ certif.volumeInfo?.artists[0] }}</b></span
          >
          <span>{{ certif.volumeInfo?.title }}</span>
          <span class="right"> $</span>
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>BUY</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
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
        width: 800px;
        margin: 10px;
        border-radius: 15px;
      }

      span {
        display: table;
        font-size: 15px;
      }
      .right {
        margin-left: auto;
      }
      p {
        padding-left: 5px;
      }
      mat-card-title-group {
        margin-left: 0;
      }

      mat-card-content {
        margin-bottom: 5px;
      }
      mat-card-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
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

  actionsSubscription: Subscription;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(store: Store, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(
        map((params) => {
          return selectCertif({ id: params.id });
        })
      )
      .subscribe((action) => store.dispatch(action));

    this.certif$ = store.select(selectSelectedCertif);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
