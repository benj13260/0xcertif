import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nfts',
    pathMatch: 'full'
  },
  /*
  {
    path: 'stake-dao',
    loadChildren: () =>
      import('./stake-dao/stake-dao.module').then((m) => m.StakeDaoModule)
  },

  {
    path: 'nfts'
    //    loadChildren: () =>
    //     import('./arts/certif/certifs.module').then((m) => m.CertifsModule)
  },
  {
    path: 'galleries'
    //    loadChildren: () =>
    //      import('./arts/certif/certifs.module').then((m) => m.CertifsModule)
  },
  {
    path: 'create'
    //    loadChildren: () =>
    //      import('./arts/certif/certifs.module').then((m) => m.CertifsModule)
  },
  
  {
    path: 'books',
    loadChildren: () =>
      import('./arts/books/books.module').then((m) => m.BooksModule)
  },
*/
  {
    path: '**',
    redirectTo: 'nfts'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
