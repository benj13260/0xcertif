import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faUser, faWifi } from '@fortawesome/free-solid-svg-icons';

import { environment as env } from '../../environments/environment';

import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme,
  selectAuth
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { AccountInfo, AuthState } from '../core/auth/auth.models';
import { selectAuthState } from '../core/core.state';
import { selectInfo } from '../core/auth/auth.selectors';

@Component({
  selector: 'sdt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = '../../assets/logo.png';
  languages = ['en', 'fr'];
  navigation = [
    { link: 'nfts', label: 'Arts' },
    { link: 'galleries/list', label: 'Galleries' },
    { link: 'create', label: 'Create NFT' }
    //{ link: 'books', label: 'Books' },
    //{ link: 'about', label: 'sdt.menu.about' }
    //{ link: 'stake-dao', label: 'sdt.menu.stake-dao' },
    //{ link: 'arts/coll', label: 'Art' }
    //{ link: 'feature-list', label: 'sdt.menu.features' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'sdt.menu.settings' }
  ];

  faUser = faUser;
  faWifi = faWifi;

  isAuthenticated$: Observable<boolean>;
  accountInfo$: Observable<AccountInfo>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store,
    private storageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.accountInfo$ = this.store.pipe(select(selectInfo));

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
