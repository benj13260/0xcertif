import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BigNumber } from 'ethers';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { CommonService } from '../../core/ethers/common.service';
import { loadStakeDaoPools } from '../../core/stake-dao/stake-dao.actions';
import { StakeDaoPoolState, StakeDaoState } from '../../core/stake-dao/stake-dao.types';


export interface Info{
  title: string,
  desc?: string,
}


@Component({
  selector: 'sdt-stake-dao-pools',
  templateUrl: './stake-dao-pools.component.html',
  styleUrls: ['./stake-dao-pools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeDaoPoolsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    
  stakeDaoPoolsState$ : Observable<StakeDaoPoolState[]>; 

  constructor(private store: Store<{stakeDao: StakeDaoState}>, private cserv: CommonService) {}

  ngOnInit() {
    this.store.dispatch(loadStakeDaoPools());
    this.stakeDaoPoolsState$ = this.store.select(state => state.stakeDao.stakeDaoPoolsState);
  }

}
