import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifCreateComponent } from './certif-create/components/certif-create.component';
import { CertifPreviewListComponent } from './main/certif-preview-list.components';
import { GalleryPreviewListComponent } from './main/gallery-preview-list.components';

import { ViewCertifPageComponent } from './main/view-certif-page.component';

export const routes: Routes = [
  {
    path: 'nft/:id',
    component: ViewCertifPageComponent,
    data: { title: 'NFT Certificate details' }
  },
  {
    path: 'galleries',
    component: GalleryPreviewListComponent,
    data: { title: 'Galleries' }
  },
  /*
  {
    path: 'my-collection',
    component: CertifCreateComponent,
    data: { title: 'My NFT collection' }
  },  
  */
  {
    path: 'create-nft',
    component: CertifCreateComponent,
    data: { title: 'Create NFT' }
  },
  {
    path: 'nfts',
    component: CertifPreviewListComponent,
    data: { title: 'NFT Certificates' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CertifsRoutingModule {}
