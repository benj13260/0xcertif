import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input
} from '@angular/core';
import {
  CdkScrollable,
  ScrollDispatcher,
  ScrollingModule
} from '@angular/cdk/scrolling';

import { Book } from '../models';
import { debounce, map, take } from 'rxjs/operators';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { FindBookPageActions } from '../actions';
import * as fromBooks from '../reducers';

@Component({
  selector: 'bc-book-preview-list',
  template: `
    <!--
<cdk-virtual-scroll-viewport itemSize="50" class="listContainer">
  <div *cdkVirtualFor="let item of ds" class="listViewPort">{{item || 'Loading...'}}</div>
  <bc-book-preview *cdkVirtualFor="let book of books" [book]="book" ></bc-book-preview>

</cdk-virtual-scroll-viewport>
-->

    <bc-book-preview
      #cmp
      *ngFor="let book of books"
      [book]="book"
    ></bc-book-preview>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .listContainer {
        height: 75vh;
        width: 50vw;
      }

      .listViewPort {
        height: 100px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPreviewListComponent {
  @Input() books!: Book[];

  searchQuery$: Observable<string>;

  ds = new MyDataSource();

  startIndex = 0;

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  scrollingSubscription: any;

  constructor(
    public scroll: ScrollDispatcher,
    private el: ElementRef,
    private store: Store
  ) {
    /*
    this.searchQuery$ = store.select(fromBooks.selectSearchQuery).pipe(take(1));


    this.scrollingSubscription = this.scroll
          .scrolled().pipe( debounce((i) => interval(200)))
          .subscribe((data: CdkScrollable) => {
            console.log(data.measureScrollOffset("bottom"));
            console.log(data.elementScrolled);
            console.log(this.el.nativeElement.offsetHeight);

            if (data.measureScrollOffset("bottom") < 200 && this.searchQuery$ != null){
              this.startIndex += 10;
              let q = this.searchQuery$+"&startIndex="+this.startIndex;
              this.store.dispatch(FindBookPageActions.searchBooks({ query: q }));


            }

          });

          */
  }
}

export class MyDataSource extends DataSource<string | undefined> {
  private _length = 1000;
  private _pageSize = 10;
  private _cachedData = Array.from<string>({ length: this._length });
  private _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject<(string | undefined)[]>(
    this._cachedData
  );
  private readonly _subscription = new Subscription();

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(string | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
        console.log('startPage ' + startPage);
        console.log('endPage ' + endPage);
      })
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    console.log('fetch page: ');
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      this._cachedData.splice(
        page * this._pageSize,
        this._pageSize,
        ...Array.from({ length: this._pageSize }).map(
          (_, i) => `Item #${page * this._pageSize + i}`
        )
      );
      this._dataStream.next(this._cachedData);
    }, Math.random() * 1000 + 200);
  }
}
