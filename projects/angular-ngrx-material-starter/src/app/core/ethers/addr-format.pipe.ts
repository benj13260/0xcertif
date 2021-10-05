import { Pipe, PipeTransform } from '@angular/core';
import { BigNumber } from 'ethers';
import { AccountInfo } from '../auth/auth.models';
import { CommonService } from './common.service';

@Pipe({ name: 'addrFmt' })
export class AddrFmtPipe implements PipeTransform {
  constructor() {}

  transform(acc: AccountInfo): string {
    return (
      acc.address.substring(0, 4) +
      '...' +
      acc.address.substring(acc.address.length - 3) +
      ' ' +
      acc.chainName
    );
  }
}
