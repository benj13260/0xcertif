import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { environmentProp } from '../../../app.properties';
import { AccountInfo } from '../../../core/auth/auth.models';
import { selectInfo } from '../../../core/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class CertifAdminGuard implements CanActivate {
  addr: string;

  constructor(private store: Store, private router: Router) {
    this.store.select(selectInfo).subscribe((m) => {
      this.addr = m?.address;
    });
  }

  accInfo: Observable<AccountInfo>;
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.addr == environmentProp.addr) return of(true);
    else return of(false);
  }
}
