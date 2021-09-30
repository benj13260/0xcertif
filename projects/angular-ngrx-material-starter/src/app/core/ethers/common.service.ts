import { Injectable } from '@angular/core';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { commify, formatUnits } from 'ethers/lib/utils';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public format(n : BigNumberish): string{
    return ethers.utils.formatEther(n);
  }

  public formatHex(n : string): string{
    return   commify(formatUnits(BigNumber.from(n),18));
  }

  public fmtBn(n : BigNumber, dec : number = 4): string {
    return commify(formatUnits(n,18)).match(/.*\.[0-9]{4}/g)?.pop()!;
    
  }

  public log(comment: string, value: string){
    console.log(comment+" : "+value)
  }

}
