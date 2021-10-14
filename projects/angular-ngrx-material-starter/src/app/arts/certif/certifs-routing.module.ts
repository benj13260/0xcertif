import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifPreviewListComponent } from './components/certif-preview-list.components';
import { GalleryPreviewListComponent } from './components/gallery-preview-list.components';

import { ViewCertifPageComponent } from './components/view-certif-page.component';

export const routes: Routes = [
  {
    path: 'nft/:id',
    component: ViewCertifPageComponent,
    data: { title: 'Certif details' }
  },
  {
    path: 'list',
    component: GalleryPreviewListComponent,
    data: { title: 'Galleries' }
  },
  {
    path: '',
    component: CertifPreviewListComponent,
    data: { title: 'Certifs' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertifsRoutingModule {}
