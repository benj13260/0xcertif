import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectCertif } from '../certif.actions';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'x-certif-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<x-certif-detail></x-certif-detail>`
})
export class ViewCertifPageComponent implements OnDestroy {
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
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
