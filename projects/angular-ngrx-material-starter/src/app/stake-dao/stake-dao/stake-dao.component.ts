import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStakeDaoInOut, loadStakeDaoPools } from '../../core/stake-dao/stake-dao.actions';


@Component({
  selector: 'sdt-stake-dao',
  templateUrl: './stake-dao.component.html',
  styleUrls: ['./stake-dao.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeDaoComponent implements OnInit {


  constructor(private store: Store) {}

  ngOnInit() {
  }

  update(){
   // this.store.dispatch(loadStakeDaoInOut());
  }

}
