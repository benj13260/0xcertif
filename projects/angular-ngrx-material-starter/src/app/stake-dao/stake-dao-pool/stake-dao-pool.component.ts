import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { CommonService } from '../../core/ethers/common.service';
import {
  loadStakeDaoInOut,
  loadStakeDaoPool
} from '../../core/stake-dao/stake-dao.actions';
import {
  StakeDaoPoolState,
  StakeDaoState
} from '../../core/stake-dao/stake-dao.types';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { StakeDaoInOutFlowComponent } from '../stake-dao-charts/stake-dao-charts-inflow-outflow/stake-dao-in-out-flow.component';

export interface Info {
  title: string;
  desc?: string;
}

@Component({
  selector: 'sdt-stake-dao-pool',
  templateUrl: './stake-dao-pool.component.html',
  styleUrls: ['./stake-dao-pool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeDaoPoolComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input('pool-id') id = Number.MAX_VALUE;

  stakeDaoPoolState$: Observable<StakeDaoPoolState>;
  /* = this.store.select(state => {
    if (this.id != null && this.id < state.stakeDao.stakeDaoPoolsState.length ){
      return state.stakeDao.stakeDaoPoolsState[this.id];
    }
  });*/

  info: Info[] = [
    {
      title: 'Balance',
      desc: ' tokens send to the contract'
    },
    {
      title: 'Total Supply',
      desc: ' tokens minted by the contract'
    },
    {
      title: 'Price per shares'
    }
  ];

  constructor(
    private store: Store<{ stakeDao: StakeDaoState }>,
    private cserv: CommonService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.stakeDaoPoolState$ = this.store.select((state) => {
      let tmp = state.stakeDao.stakeDaoPoolsState.filter(
        (pool: StakeDaoPoolState) => pool.id === this.id
      );
      if (tmp.length > 0) return tmp[0];
    });
    this.stakeDaoPoolState$.pipe(take(1)).subscribe((v) => {
      if (v.loading == true) {
        this.store.dispatch(loadStakeDaoPool({ pool: v }));
      }
    });
  }

  loadInOut(s: StakeDaoPoolState) {
    console.log('loadInOut ' + s.stakeDaoPoolInfo.contract);
    this.store.dispatch(
      loadStakeDaoInOut({ contract: s.stakeDaoPoolInfo.contract })
    );
    this.dialog.open(StakeDaoInOutFlowComponent, {
      data: { title: s.sdtoken }
    });
  }
}
