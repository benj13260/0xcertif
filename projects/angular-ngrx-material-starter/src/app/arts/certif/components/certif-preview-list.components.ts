import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Observer } from 'zen-observable-ts';
import { Certif } from '../certif';
import { searchCertif } from '../certif.actions';
import { RootCertifsState, selectAll, selectLoaded } from '../certif.reducer';

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

    route.params.subscribe((param) => {
      console.log('param ' + JSON.stringify(param));
    });

    this.scrollingSubscription = this.scroll
      .scrolled()
      .pipe(debounce((i) => interval(200)))
      .subscribe((data: CdkScrollable) => {
        console.log(data.measureScrollOffset('bottom'));
        console.log(data.elementScrolled);
        console.log(this.el.nativeElement.offsetHeight);

        if (
          data.measureScrollOffset('bottom') < 200
          //&& this.searchQuery$ != null
        ) {
          this.ngZone.run(() => {
            this.getItems();
          });
        }
      });

    this.getItems();
  }

  getItems(addr: string = '') {
    for (
      let index = this.startIndex;
      index < this.startIndex + this.GAP;
      index++
    ) {
      this.store.dispatch(searchCertif({ addr: this.address, id: '' + index }));
    }
    this.startIndex += this.GAP;
  }
}
