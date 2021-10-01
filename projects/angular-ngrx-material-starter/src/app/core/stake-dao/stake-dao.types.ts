// INTERFACES
export interface StakeDaoState {
  stakeDaoPoolsState: StakeDaoPoolState[];
  stakeDaoInOutState: StakeDaoInOutState;
}

export interface BigNumberT {
  type: string;
  hex: string;
}

export interface DialogData {
  title: string;
}

export interface StakeDaoPoolState {
  id?: number;
  loading: boolean;
  // info from yVault
  token: string;
  sdtoken: string;
  balance: BigNumberT;
  totalSupply: BigNumberT;
  pricePerShare: BigNumberT;
  // info from Masterchief
  stakeDaoPoolInfo?: StakeDaoPoolInfo;
}

export interface StakeDaoPoolInfo {
  contract?: string;
  allocPoint: BigNumberT;
  lastRewardBlock: number;
  accSdtPerShare: BigNumberT;
}

export interface AddressState {
  value: string;
}

export interface StakeDaoPoolInvState {
  shares: number;
  rewards: number;
}

export interface StakeDaoInOutState {
  result: graphData[];
  loading: boolean;
}
export interface graphData {
  name: string;
  value: number;
}

// INSTANCES

export const stakeDaoPoolInfoInit = {
  contract: '0x',
  allocPoint: { type: 'BigNumber', hex: '0x0000' },
  lastRewardBlock: 0,
  accSdtPerShare: { type: 'BigNumber', hex: '0x0000' }
};

export const stakeDaoPoolStateInit = {
  id: 0,
  loading: false,
  token: '--',
  sdtoken: '--',
  balance: { type: 'BigNumber', hex: '0x0000' },
  totalSupply: { type: 'BigNumber', hex: '0x0000' },
  pricePerShare: { type: 'BigNumber', hex: '0x0000' },
  stakeDaoPoolInfo: stakeDaoPoolInfoInit
};

export const stakeDaoInOutStateInit = {
  result: [],
  loading: true
};
