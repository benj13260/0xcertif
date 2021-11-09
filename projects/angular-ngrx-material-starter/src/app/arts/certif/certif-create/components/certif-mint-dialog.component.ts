import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nft } from '../../certif';

export interface DialogData {
  nft: Nft;
}

@Component({
  selector: 'dialog-mint',
  template: `
    <h1 mat-dialog-title>Create NFT Certificate</h1>
    <div mat-dialog-content>
      <pre>{{ pretty }}</pre>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="create()" cdkFocusInitial>Create</button>
      <button mat-button (click)="onNoClick()">No Thanks</button>
    </div>
  `
})
export class DialogMint {
  pretty: string;

  constructor(
    public dialogRef: MatDialogRef<DialogMint>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.pretty = JSON.stringify(data.nft, null, '\t');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.dialogRef.close();
  }
}
