import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Certif } from '../certif';
import { getCertifs, searchNFT } from '../certif.actions';
import { RootCertifsState, selectAll } from '../certif.reducer';

@Component({
  selector: 'x-certif-preview-list',
  template: `
    <div>
      <x-certif-preview
        *ngFor="let certif of certifs$ | async"
        [certif]="certif"
      ></x-certif-preview>
    </div>
    <mat-divider></mat-divider>
  `,
  styles: [
    `
      div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: #f0ecea;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertifPreviewListComponent {
  certifs$: Observable<Certif[]>;

  scrollingSubscription: any;
  startIndex = 1;
  GAP = 10;

  address: string;

  constructor(
    private store: Store<RootCertifsState>,
    route: ActivatedRoute,
    public scroll: ScrollDispatcher,
    private el: ElementRef,
    private ngZone: NgZone
  ) {
    this.certifs$ = store.select(selectAll);
    this.store.dispatch(getCertifs({ id: '0' }));
  }

  getNFT(addr: string = '') {
    for (
      let index = this.startIndex;
      index < this.startIndex + this.GAP;
      index++
    ) {
      this.store.dispatch(searchNFT({ addr: this.address, id: '' + index }));
    }
    this.startIndex += this.GAP;
  }
}
