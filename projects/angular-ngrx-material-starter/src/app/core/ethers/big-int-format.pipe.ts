import { Pipe, PipeTransform } from "@angular/core";
import { BigNumber } from "ethers";
import { CommonService } from "./common.service";


@Pipe({ name: "bigIntFmt" })
export class BigIntFmtPipe implements PipeTransform {

  constructor(private cserv : CommonService ) {

  }

  transform(n : BigNumber, dec : number = 4): string {
    return this.cserv.fmtBn(n,dec);
  }


}