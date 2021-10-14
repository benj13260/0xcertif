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
    <bc-book-preview *ngFor="let book of books" [book]="book"></bc-book-preview>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPreviewListComponent {
  @Input() books!: Book[];

  constructor() {}
}
