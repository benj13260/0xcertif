import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifCreateComponent } from './certif-create/components/certif-create.component';
import { CertifPreviewListComponent } from './components/certif-preview-list.components';
import { GalleryPreviewListComponent } from './components/gallery-preview-list.components';

import { ViewCertifPageComponent } from './components/view-certif-page.component';

export const routes: Routes = [
  {
    path: 'nft/:id',
    component: ViewCertifPageComponent,
    data: { title: 'NFT Certificate details' }
  },
  {
    path: 'list',
    component: GalleryPreviewListComponent,
    data: { title: 'Galleries' }
  },
  {
    path: 'create',
    component: CertifCreateComponent,
    data: { title: 'Create NFT' }
  },
  {
    path: '',
    component: CertifPreviewListComponent,
    data: { title: 'NFT Certificates' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertifsRoutingModule {}
