import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/animations/route.animations';
import { Certif, CertifUI } from '../../certif';
import {
  uploadCompletedAction,
  uploadRequestActionInit
} from '../../certif.actions';
import { CertifService } from '../../certif.services';
import { CertifCreateService } from '../certif-create.service';

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

  //imageNum: number = 1;
  //imageBuf: ArrayBuffer;

  filteredArtistsList: Observable<string[]>;

  //allArtists = ['Mist', 'MadC', 'Supakitch', 'Other'];
  artistItems$: Observable<string[]>;
  editArtists = [];

  allGalleries = ['Kolly gallery', 'Gallery X', 'Gallery Y'];

  editGalleries = [];

  constructor(
    private fb: FormBuilder,
    private certifCreateService: CertifCreateService,
    private certifService: CertifService,
    private store: Store
  ) {}

  ngOnInit() {
    this.certifs$ = this.certifCreateService.certifs$;
    this.artistItems$ = from(this.certifService.getArtists());
    this.certifForm = this.fb.group({
      id: '',
      title: ['', [Validators.required, Validators.minLength(5)]],
      desc: '', //['', [Validators.required]],
      artists: '',
      galleries: '',
      image: '',
      height: '', //['', [Validators.required]],
      width: '', //[Validators.required]],
      depth: '' //['', [Validators.required]],
    });

    this.isEdit$ = this.certifForm.get('id').valueChanges.pipe(
      startWith(''),
      map((id) => ({ value: (id || '').length > 0 }))
    );

    /*
    let rs : Galleries = galleriesMock();
    let r : Gallery = rs.galleries[0];
    //this.certifService.addGallery(r)
    this.certifService.getGallery();
    */
  }

  removeCertif(id: string) {
    this.certifCreateService.removeCertif(id);
  }

  editCertif(certif: Certif) {
    let certifUI = this.certifCreateService.convertToUI(certif);
    this.editArtists = certifUI.artists;
    this.editGalleries = certifUI.galleries;
    this.certifForm.setValue(certifUI);
    this.store.dispatch(uploadCompletedAction({ url: certifUI.image }));
    //this.certifForm.patchValue({ ...certifUI });
    console.log(this.certifForm.value);
  }

  onReset() {
    this.store.dispatch(uploadRequestActionInit());
  }

  onSubmit(userFormRef: FormGroupDirective) {
    console.log('call onsubmit');
    const data = this.certifForm.getRawValue();
    if (this.certifForm.valid) {
      const dataUI = this.certifForm.getRawValue();
      let data = this.certifCreateService.convert(dataUI);
      if (data.id && data.id.length) {
        this.certifCreateService.updateCertif(data);
      } else {
        this.certifCreateService.addCertif({ ...data });
      }

      this.store.dispatch(uploadRequestActionInit());

      //userFormRef.resetForm();
      //this.certifForm.reset();
      //this.imageNum += 1;
    }
  }

  mint(certif: Certif) {
    this.certifCreateService.mint(certif);
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
    console.log('updateImage');
    console.log(image);
    let certifUI: CertifUI = this.certifForm.value;
    certifUI.image = image;
    this.certifForm.setValue(certifUI);
  }
}
