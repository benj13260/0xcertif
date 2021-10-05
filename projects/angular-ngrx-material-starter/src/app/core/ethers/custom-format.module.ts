import { NgModule } from '@angular/core';
import { BigIntFmtPipe } from './big-int-format.pipe';
import { AddrFmtPipe } from './addr-format.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [BigIntFmtPipe, AddrFmtPipe],
  exports: [BigIntFmtPipe, AddrFmtPipe]
})
export class CustomFmtModule {}
