import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../../core/animations/route.animations';
import { FindBookPageActions } from '../../../../books/actions';
import { CertifCreateService } from '../../certif-create.service';

@Component({
  selector: 'x-certif-create-img',
  template: `
    <div>
      <label>{{ value }}</label>
      <mat-slider
        [(ngModel)]="value"
        [max]="max"
        [min]="min"
        [step]="step"
        (change)="onChangeEvent(value)"
      >
      </mat-slider>
    </div>
    <div>
      <img mat-card-lg-image [src]="srcUrl" />
    </div>
  `,
  styles: [
    `
      label {
        padding-right: 15px;
        width: 30px;
      }
      mat-slider {
        width: 90%;
      }
      img {
        width: 90%;
        height: auto;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CertifCreateImgComponent implements OnInit, OnChanges {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Output() selectEvent = new EventEmitter<string>();
  @Input() srcUrl: string = '';

  value = 1;
  url =
    'https://firebasestorage.googleapis.com/v0/b/webapp-c075f.appspot.com/o/assets%2F{{imageNum}}.jpg?alt=media&token=fa42ae47-7b61-4d5e-8c2e-6039220a9d6a';

  max = '450';
  min = '1';
  step = '1';

  constructor() {}

  ngOnInit(): void {
    this.onChangeEvent(this.value);
  }

  ngOnChanges() {}

  onChangeEvent(value: number) {
    console.log(value);

    this.srcUrl = this.url.replace('{{imageNum}}', '' + value);
    console.log(this.srcUrl);
    this.selectEvent.emit(this.srcUrl);
  }
}
