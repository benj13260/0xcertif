import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CustomFmtModule } from '../../core/ethers/custom-format.module'; //../ethers/custom-format.module';
import { CertifEffects } from './certif.effects';
import { CertifPreviewListComponent } from './components/certif-preview-list.components';
import { CertifPreviewComponent } from './components/certif-preview.components';
import { ViewCertifPageComponent } from './components/view-certif-page.component';
import { CertifDetailComponent } from './components/certif-detail.component';
import { CertifsRoutingModule } from './certifs-routing.module';
import { CertifReducers, reducer } from './certif.reducer';
import { GalleryPreviewComponent } from './components/gallery-preview.components';
import { GalleryPreviewListComponent } from './components/gallery-preview-list.components';

export const COMPONENTS = [
  CertifPreviewComponent,
  CertifPreviewListComponent,
  CertifDetailComponent,
  ViewCertifPageComponent,
  GalleryPreviewComponent,
  GalleryPreviewListComponent
];

@NgModule({
  imports: [
    CommonModule,
    //MaterialModule,

    CertifsRoutingModule,
    CustomFmtModule,
    //ScrollingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('c', CertifReducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([CertifEffects]),
    //PipesModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  declarations: [COMPONENTS]
})
export class CertifsModule {}
