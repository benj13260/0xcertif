import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountInfo } from '../../../core/auth/auth.models';
import { selectInfo } from '../../../core/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class CertifLoggedGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  accInfo: Observable<AccountInfo>;
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.select(selectInfo).pipe(
      map((acc) => {
        if (acc != null) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
    return of(null);
  }
}
