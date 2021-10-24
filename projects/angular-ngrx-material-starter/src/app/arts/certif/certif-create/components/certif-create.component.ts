import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/animations/route.animations';
import { Certif, CertifUI } from '../../certif';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { CertifCreateService } from '../certif-create.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'x-certif-create',
  templateUrl: './certif-create.component.html',
  styleUrls: ['./certif-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertifCreateComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  certifForm: FormGroup;
  certifs$: Observable<Certif[]>;
  isEdit$: Observable<{ value: boolean }>;

  faTimes = faTimes;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;

  imageNum: number = 1;

  filteredArtistsList: Observable<string[]>;

  allArtists = ['Mist', 'MadC', 'Supakitch', 'Other'];

  editArtists = [];

  allGalleries = ['Kolly gallery', 'Gallery X', 'Gallery Y'];

  editGalleries = [];

  constructor(
    private fb: FormBuilder,
    private certifCreateService: CertifCreateService
  ) {}

  ngOnInit() {
    this.certifs$ = this.certifCreateService.certifs$;
    this.certifForm = this.fb.group({
      id: '',
      title: ['', [Validators.required, Validators.minLength(5)]],
      artists: '',
      galleries: '',
      image: ''
    });

    this.isEdit$ = this.certifForm.get('id').valueChanges.pipe(
      startWith(''),
      map((id) => ({ value: (id || '').length > 0 }))
    );
  }

  removeUser(id: string) {
    this.certifCreateService.removeCertif(id);
  }

  editUser(certif: Certif) {
    let certifUI = this.certifCreateService.convertToUI(certif);
    console.log(certifUI);
    this.editArtists = certifUI.artists;
    this.editGalleries = certifUI.galleries;
    this.certifForm.setValue(certifUI);
    //this.certifForm.patchValue({ ...certifUI });
    console.log(this.certifForm.value);
  }

  onSubmit(userFormRef: FormGroupDirective) {
    const data = this.certifForm.getRawValue();
    if (this.certifForm.valid) {
      const dataUI = this.certifForm.getRawValue();
      let data = this.certifCreateService.convert(dataUI);
      if (data.id && data.id.length) {
        this.certifCreateService.updateCertif(data);
      } else {
        this.certifCreateService.addCertif({ ...data });
      }
      //userFormRef.resetForm();
      //this.certifForm.reset();

      this.imageNum += 1;
    }
  }

  trackByUserId(index: number, certif: Certif): string {
    return certif.id;
  }

  updateArtists(artists: string[]) {
    let certifUI: CertifUI = this.certifForm.value;
    certifUI.artists = artists;
    this.certifForm.setValue(certifUI);
  }

  updateGalleries(galleries: string[]) {
    let certifUI: CertifUI = this.certifForm.value;
    certifUI.galleries = galleries;
    this.certifForm.setValue(certifUI);
  }

  updateImage(image: string) {
    let certifUI: CertifUI = this.certifForm.value;
    certifUI.image = image;
    this.certifForm.setValue(certifUI);
  }
}
