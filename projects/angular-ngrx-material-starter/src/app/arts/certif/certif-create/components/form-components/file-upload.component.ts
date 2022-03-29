import { HttpClient } from '@angular/common/http';
import {
  ApplicationRef,
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { uploadRequestAction } from '../../../certif.actions';
import { selectFormImg, selectFormLoad } from '../../../certif.reducer';

@Component({
  selector: 'x-file-upload',
  template: `
    <div class="div-button">
      <input
        type="file"
        class="file-input"
        [accept]="requiredFileType"
        (change)="onFileSelected($event)"
        #fileUpload
      />
      <button class="btn-action" mat-raised-button (click)="fileUpload.click()">
        Upload Image
      </button>
      <span *ngIf="load$ | async">Loading..</span>
    </div>
    <div>
      <img mat-card-lg-image [src]="url$ | async" />
    </div>
  `,
  styles: [
    `
      .file-input {
        display: none;
      }
      .slider {
        width: 50%;
      }
      img {
        height: auto;
        width: -webkit-fill-available;
      }
      .file-upload {
        max-width: 200px;
        align-self: center;
      }
      .div-button {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }
      mat-divider {
        margin: 10px;
      }
    `
  ]
})
export class FileUploadComponent implements OnInit {
  @Output() selectImage = new EventEmitter<string>();

  requiredFileType: string = 'image/png, image/gif, image/jpeg';
  fileName = '';
  url$: Observable<string>;
  load$: Observable<boolean>;
  url: string = '';

  constructor(
    private http: HttpClient,
    private store: Store,
    private readonly zone: NgZone,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.load$ = this.store.select(selectFormLoad);
    this.url$ = this.store.select(selectFormImg);
    this.url$.subscribe((e) => {
      this.selectImage.emit(e);
      console.log('image ' + e);
      this.url = e;
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      console.log('upload');
      this.store.dispatch(uploadRequestAction({ file: file }));
    }
  }
}
