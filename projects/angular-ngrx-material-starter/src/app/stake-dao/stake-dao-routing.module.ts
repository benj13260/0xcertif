import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StakeDaoComponent } from './stake-dao/stake-dao.component';

const routes: Routes = [
  {
    path: '',
    component: StakeDaoComponent,
    data: { title: 'sdt.menu.stake-dao' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  StakeDAORoutingModule {}
