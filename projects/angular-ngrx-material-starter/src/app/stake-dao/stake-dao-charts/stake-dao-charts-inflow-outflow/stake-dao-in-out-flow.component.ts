import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { StakeDaoGraphServices, Transfer, variables } from "../../../core/stake-dao/stake-dao-graph.services";
import { DialogData, StakeDaoInOutState, StakeDaoState } from "../../../core/stake-dao/stake-dao.types";
import { GraphQLClient,request, gql } from 'graphql-request'
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import { ColorHelper } from "@swimlane/ngx-charts";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'sdt-stake-dao-in-out-flow',
  templateUrl: './stake-dao-in-out-flow.component.html',
  styleUrls: ['./stake-dao-in-out-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeDaoInOutFlowComponent implements OnInit {

  public chart = {
    single: [],
    view: [700, 400], // Size
    // options
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Time',
    showYAxisLabel: true,
    yAxisLabel: 'In-out',
    scheme : "flame",
    /*colorScheme: ColorHelper {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    }*/
  };

  stakeDaoInOutState$ : Observable<StakeDaoInOutState>;

  constructor(private store: Store<{stakeDao: StakeDaoState}>,
    public dialogRef: MatDialogRef<StakeDaoInOutFlowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  
  ngOnInit(){
      this.stakeDaoInOutState$ = this.store.select(state => state.stakeDao.stakeDaoInOutState)
  }


  onSelect(event) {
    console.log(event)
  }

}