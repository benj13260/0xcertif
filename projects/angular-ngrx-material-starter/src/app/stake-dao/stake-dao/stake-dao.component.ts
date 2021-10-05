import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers } from 'ethers';
import {
  loadStakeDaoInOut,
  loadStakeDaoPools
} from '../../core/stake-dao/stake-dao.actions';
import { StakeDaoServices } from '../../core/stake-dao/stake-dao.services';

@Component({
  selector: 'sdt-stake-dao',
  templateUrl: './stake-dao.component.html',
  styleUrls: ['./stake-dao.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeDaoComponent implements OnInit {
  constructor(private store: Store, private s: StakeDaoServices) {}

  ngOnInit() {}

  update() {
    // this.store.dispatch(loadStakeDaoInOut());
  }
}
