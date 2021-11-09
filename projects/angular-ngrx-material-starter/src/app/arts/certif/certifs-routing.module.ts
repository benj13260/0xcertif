import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifCreateComponent } from './certif-create/components/certif-create.component';
import { CertifAdminGuard } from './guards/certifAdmin.guard';
import { CertifDetailComponent } from './main/certif-detail.component';
import { CertifPreviewListComponent } from './main/certif-preview-list.components';
import { GalleryPreviewListComponent } from './main/gallery-preview-list.components';

export const createNftPath = 'create-nft';

export const routes: Routes = [
  {
    path: 'nfts/:id',
    component: CertifDetailComponent,
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
    path: createNftPath,
    component: CertifCreateComponent,
    canActivate: [CertifAdminGuard],
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
