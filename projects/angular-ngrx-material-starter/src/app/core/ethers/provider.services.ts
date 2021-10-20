import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

import AccountInfoC, { AccountInfo } from '../auth/auth.models';

declare const window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer: ethers.providers.JsonRpcSigner;

@Injectable({
  providedIn: 'root'
})
export class ProviderServices {
  provider: any;
  accounts: any;

  constructor() {}

  async connect(): Promise<AccountInfo> {
    let accountInfo: AccountInfo = new AccountInfoC().getAccount();
    await provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();
    accountInfo.address = await signer.getAddress();
    let network = await provider.getNetwork();
    accountInfo.chain = network.chainId;
    switch (accountInfo.chain) {
      case 1:
        accountInfo.chainName = 'Ethereum';
        break;
      case 3:
        accountInfo.chainName = 'Ropsten';
        break;
      case 5:
        accountInfo.chainName = 'Gor';
        break;
      case 43113:
        accountInfo.chainName = 'Fuji ';
        break;
      case 43114:
        accountInfo.chainName = 'Avalanche';
        break;
      default:
        accountInfo.chainName = 'Unknown';
        break;
    }
    /*
    let s = await signer.signMessage("Hello");
    console.log(JSON.stringify(s));
*/
    console.log(JSON.stringify(accountInfo));
    return accountInfo.address !== null ? accountInfo : null;
  }
}
