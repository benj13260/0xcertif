import { NgModule } from '@angular/core';
import { BigIntFmtPipe } from './big-int-format.pipe';
import { AddrFmtPipe } from './addr-format.pipe';
import { AddCommasPipe } from './add-commas.pipe';
import { EllipsisPipe } from './ellipsis.pipe';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [BigIntFmtPipe, AddrFmtPipe, AddCommasPipe, EllipsisPipe],
  exports: [BigIntFmtPipe, AddrFmtPipe, AddCommasPipe, EllipsisPipe]
})
export class CustomFmtModule {}
