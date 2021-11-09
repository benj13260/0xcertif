import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CoreModule, httpLoaderFactory } from '../../core/core.module';
import { CustomFmtModule } from '../../core/ethers/custom-format.module'; //../ethers/custom-format.module';
import { CertifCreateService } from './certif-create/certif-create.service';
import { CertifCreateComponent } from './certif-create/components/certif-create.component';
import { DialogMint } from './certif-create/components/certif-mint-dialog.component';
import { CertifChipComponent } from './certif-create/components/form-components/certif-chip.component';
import { CertifCreateImgComponent } from './certif-create/components/form-components/certif-create-img.component';
import { FileUploadComponent } from './certif-create/components/form-components/file-upload.component';
import { CertifService } from './certif.services';
import { CertifsRoutingModule } from './certifs-routing.module';
import { CertifDetailComponent } from './main/certif-detail.component';
import { CertifPreviewListComponent } from './main/certif-preview-list.components';
import { CertifPreviewComponent } from './main/certif-preview.components';
import { GalleryPreviewListComponent } from './main/gallery-preview-list.components';
import { GalleryPreviewComponent } from './main/gallery-preview.components';
import { ViewCertifPageComponent } from './main/view-certif-page.component';

export const COMPONENTS = [
  CertifPreviewComponent,
  CertifPreviewListComponent,
  CertifDetailComponent,
  ViewCertifPageComponent,
  GalleryPreviewComponent,
  GalleryPreviewListComponent,
  CertifCreateComponent,
  CertifChipComponent,
  CertifCreateImgComponent,
  FileUploadComponent,
  DialogMint
];

@NgModule({
  imports: [
    CommonModule,
    //MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CertifsRoutingModule,
    CustomFmtModule,
    //ScrollingModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    // StoreModule.forFeature('c', certifReducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    //EffectsModule.forFeature([CertifEffects]),
    //PipesModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule,
    FontAwesomeModule,
    MatSliderModule
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  declarations: [COMPONENTS],
  providers: [CertifCreateService, CertifService]
})
export class CertifsModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    faIconLibrary: FaIconLibrary
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    faIconLibrary.addIcons(faTimes);
  }
}
