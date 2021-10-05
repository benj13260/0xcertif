import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { StakeDAORoutingModule } from './stake-dao-routing.module';
import { CustomFmtModule } from '../core/ethers/custom-format.module';
import { StakeDaoComponent } from './stake-dao/stake-dao.component';
import { StakeDaoPoolsComponent } from './stake-dao-pools/stake-dao-pools.component';
import { StakeDaoPoolComponent } from './stake-dao-pool/stake-dao-pool.component';
import { StakeDaoInOutFlowComponent } from './stake-dao-charts/stake-dao-charts-inflow-outflow/stake-dao-in-out-flow.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    StakeDaoComponent,
    StakeDaoPoolsComponent,
    StakeDaoPoolComponent,
    StakeDaoInOutFlowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StakeDAORoutingModule,
    NgxChartsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CustomFmtModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

  //{ provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class StakeDaoModule {}
