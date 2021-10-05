export interface AuthState {
  isAuthenticated: boolean;
  accountInfo?: AccountInfo;
}

export interface AccountInfo {
  address?: string;
  chain?: number;
  chainName?: string;
}

export default class AccountInfoC {
  accountInfoInit: AccountInfo = {
    address: null,
    chain: null
  };
  getAccount(): AccountInfo {
    return JSON.parse(JSON.stringify(this.accountInfoInit));
  }
}
