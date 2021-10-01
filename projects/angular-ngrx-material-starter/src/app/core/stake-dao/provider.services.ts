import { Injectable } from '@angular/core';
import Web3Modal from 'web3modal';
import { JsonRpcProvider } from '@ethersproject/providers';
/*
const providerOptions = {
    walletconnect: {
      package: JsonRpcProvider, // required
      options: {
        infuraId: "INFURA_ID" // required
      }
    }
  };

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});
*/

@Injectable({
  providedIn: 'root'
})
export class ProviderServices {
  provider: any;
  accounts: any;
  web3Modal;

  constructor() {
    const providerOptions = {};

    this.web3Modal = new Web3Modal({
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)'
      }
    });
  }

  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    console.log('connectAccount');
    //this.web3js = new Web3(this.provider); // create web3 instance
    //this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }
}
