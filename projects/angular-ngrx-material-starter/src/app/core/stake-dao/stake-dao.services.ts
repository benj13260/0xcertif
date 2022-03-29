import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BigNumber, Contract, ethers } from 'ethers';
import {
  StakeDaoPoolInfo,
  StakeDaoPoolState,
  stakeDaoPoolStateInit
} from './stake-dao.types';
import yVaultABI from '../../../assets/contracts/yVaultABI.json';
import masterChefABI from '../../../assets/contracts/masterChef.json';
import {
  InOut,
  StakeDaoGraphServices,
  variables
} from './stake-dao-graph.services';
import { environmentProp } from '../../app.properties';
import { Apollo } from 'apollo-angular';

export interface inOut {
  name: string;
  in: number;
  out: number;
}

const Ox = '0x0000000000000000000000000000000000000000';

@Injectable({
  providedIn: 'root'
})
export class StakeDaoServices {
  private masterChefContract: string =
    '0xfea5e213bbd81a8a94d0e1edb09dbd7ceab61e1c';
  private sdeursCRV: string = '0xCD6997334867728ba14d7922f72c893fcee70e84';
  private infura: string =
    'https://mainnet.infura.io/v3/' + environmentProp.infuraApiKey;

  private yVaultList: string[] = [
    '0xB17640796e4c27a39AF51887aff3F8DC0daF9567',
    '0xCD6997334867728ba14d7922f72c893fcee70e84',
    '0x24129B935AfF071c4f0554882C0D9573F4975fEd',
    '0xa2761B0539374EB7AF2155f76eb09864af075250',
    '0x5af15DA84A4a6EDf2d9FA6720De921E1026E37b7'
  ];
  private provider = new ethers.providers.JsonRpcProvider(this.infura);

  private stakeDaoPoolGen: StakeDaoPoolState;

  constructor(
    private http: HttpClient,
    private stakeDaoGraphServices: StakeDaoGraphServices,
    private apollo: Apollo
  ) {}

  public async getInOut(contractAddr: string): Promise<any> {
    let v = JSON.parse(JSON.stringify(variables));
    v.address = contractAddr;
    var t = [
      {
        name: 'In',
        series: []
      },
      {
        name: 'Out',
        series: []
      }
    ];

    return null;

    let r;
    r = await this.apollo
      .watchQuery<InOut>({
        query: this.stakeDaoGraphServices.documentIn,
        variables: v
      })
      .refetch();
    r.data.ethereum.transfers.forEach((v) => {
      t[0].series.push({
        name: v.date.date,
        value: v.amount,
        tooltip: v.count
      });
    });

    r = await this.apollo
      .watchQuery<InOut>({
        query: this.stakeDaoGraphServices.documentOut,
        variables: v
      })
      .refetch();
    r.data.ethereum.transfers.forEach((v) => {
      t[1].series.push({
        name: v.date.date,
        value: v.amount,
        tooltip: v.count
      });
    });

    return t;
  }

  public async getStakeDaoPools(): Promise<StakeDaoPoolState[]> {
    /*
      let contract: Contract = new Contract(this.masterChefContract,masterChefABI,this.provider);
      let poolID : number = 0;
      let realPool : number = 0;
      let poolLength = await contract.poolLength();
      let r : StakeDaoPoolState[] = new Array(poolLength);
      while(poolID < poolLength){
        let v =  await contract.poolInfo(poolID);
        if (this.yVaultList.includes(v.lpToken)){
          let p : StakeDaoPoolState =  JSON.parse(JSON.stringify(stakeDaoPoolStateInit));
          p.loading= true;
          p.stakeDaoPoolInfo.accSdtPerShare = v.accSdtPerShare;
          p.stakeDaoPoolInfo.allocPoint = v.allocPoint;
          p.stakeDaoPoolInfo.contract = v.lpToken;
          p.id = realPool;
          r[realPool] = p;
          realPool+=1;
        }
        poolID+=1;
      }
      return r;
      */
    // For test:
    return [
      {
        id: 0,
        loading: true,
        token: '--',
        sdtoken: '--',
        balance: { type: 'BigNumber', hex: '0x0000' },
        totalSupply: { type: 'BigNumber', hex: '0x0000' },
        pricePerShare: { type: 'BigNumber', hex: '0x0000' },
        stakeDaoPoolInfo: {
          contract: '0xB17640796e4c27a39AF51887aff3F8DC0daF9567',
          allocPoint: { type: 'BigNumber', hex: '0x026f' },
          lastRewardBlock: 0,
          accSdtPerShare: { type: 'BigNumber', hex: '0x0905fd2a7a' }
        }
      },
      {
        id: 1,
        loading: true,
        token: '--',
        sdtoken: '--',
        balance: { type: 'BigNumber', hex: '0x0000' },
        totalSupply: { type: 'BigNumber', hex: '0x0000' },
        pricePerShare: { type: 'BigNumber', hex: '0x0000' },
        stakeDaoPoolInfo: {
          contract: '0xCD6997334867728ba14d7922f72c893fcee70e84',
          allocPoint: { type: 'BigNumber', hex: '0x07ae' },
          lastRewardBlock: 0,
          accSdtPerShare: { type: 'BigNumber', hex: '0x1269ebbda3' }
        }
      },
      {
        id: 2,
        loading: true,
        token: '--',
        sdtoken: '--',
        balance: { type: 'BigNumber', hex: '0x0000' },
        totalSupply: { type: 'BigNumber', hex: '0x0000' },
        pricePerShare: { type: 'BigNumber', hex: '0x0000' },
        stakeDaoPoolInfo: {
          contract: '0x24129B935AfF071c4f0554882C0D9573F4975fEd',
          allocPoint: { type: 'BigNumber', hex: '0x94' },
          lastRewardBlock: 0,
          accSdtPerShare: { type: 'BigNumber', hex: '0x04b4ceb6e17d42' }
        }
      },
      {
        id: 3,
        loading: true,
        token: '--',
        sdtoken: '--',
        balance: { type: 'BigNumber', hex: '0x0000' },
        totalSupply: { type: 'BigNumber', hex: '0x0000' },
        pricePerShare: { type: 'BigNumber', hex: '0x0000' },
        stakeDaoPoolInfo: {
          contract: '0xa2761B0539374EB7AF2155f76eb09864af075250',
          allocPoint: { type: 'BigNumber', hex: '0x89' },
          lastRewardBlock: 0,
          accSdtPerShare: { type: 'BigNumber', hex: '0x032fa1e29c0b96' }
        }
      },
      {
        id: 4,
        loading: true,
        token: '--',
        sdtoken: '--',
        balance: { type: 'BigNumber', hex: '0x0000' },
        totalSupply: { type: 'BigNumber', hex: '0x0000' },
        pricePerShare: { type: 'BigNumber', hex: '0x0000' },
        stakeDaoPoolInfo: {
          contract: '0x5af15DA84A4a6EDf2d9FA6720De921E1026E37b7',
          allocPoint: { type: 'BigNumber', hex: '0x00' },
          lastRewardBlock: 0,
          accSdtPerShare: { type: 'BigNumber', hex: '0x08fc23db87ed' }
        }
      }
    ];
  }

  public async getStakeDaoPool(
    pool: StakeDaoPoolState
  ): Promise<StakeDaoPoolState> {
    let contract: Contract = new Contract(
      pool.stakeDaoPoolInfo.contract,
      yVaultABI,
      this.provider
    );
    let r: StakeDaoPoolState = JSON.parse(
      JSON.stringify(stakeDaoPoolStateInit)
    );
    r.loading = false;
    r.id = pool.id;
    r.sdtoken = await contract.symbol();
    r.token = r.token.substr(2);
    r.balance = await contract.balance();
    r.pricePerShare = await contract.getPricePerFullShare();
    r.totalSupply = await contract.totalSupply();
    r.stakeDaoPoolInfo = pool.stakeDaoPoolInfo;
    //r. = await contract.available();
    return r;
  }
}
