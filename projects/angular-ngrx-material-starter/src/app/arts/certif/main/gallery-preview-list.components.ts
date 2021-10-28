import { ChangeDetectionStrategy, Component } from '@angular/core';
import { galleriesMock, Gallery } from '../certif';

@Component({
  selector: 'x-gallery-preview-list',
  template: `
    <div>
      <x-gallery-preview
        *ngFor="let gallery of galleries"
        [gallery]="gallery"
      ></x-gallery-preview>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryPreviewListComponent {
  galleries: Gallery[];

  constructor() {
    let g = galleriesMock();
    this.galleries = g.galleries;
  }
}
