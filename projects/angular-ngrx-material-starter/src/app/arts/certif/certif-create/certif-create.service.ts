import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import {
  addAttribute,
  Certif,
  CertifUI,
  generateMockCertif,
  generateMockCertifUi,
  generateNft,
  Nft
} from '../certif';
import { DialogMint } from './components/certif-mint-dialog.component';

@Injectable()
export class CertifCreateService {
  certifs$: Observable<Certif[]>;
  db: any;

  private certifsColl: AngularFirestoreCollection<Certif>;
  certifsCollIndex: string = 'certifs';

  constructor(
    private afs: AngularFirestore,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.db = this.afs.firestore;
    this.certifsColl = afs.collection<Certif>(this.certifsCollIndex);
    this.certifs$ = this.certifsColl.valueChanges();
  }

  async addCertif(certif: Partial<Certif>) {
    let id = uuid();
    await setDoc(doc(this.db, this.certifsCollIndex, id), {
      ...certif,
      id: id
    });
  }

  async updateCertif(certif: Certif) {
    await setDoc(doc(this.db, this.certifsCollIndex, certif.id), certif);
  }

  async removeCertif(id: string) {
    console.log('delete ' + id);
    await deleteDoc(doc(this.db, this.certifsCollIndex, id));
  }

  convert(certifUI: CertifUI): Certif {
    let c = generateMockCertif();
    c.id = certifUI.id;
    c.volumeInfo.title = certifUI.title;
    c.volumeInfo.desc = certifUI.desc;
    c.volumeInfo.galleries = certifUI.galleries;
    c.volumeInfo.artists = certifUI.artists;
    c.volumeInfo.imageLinks = { full: certifUI.image };
    c.volumeInfo.height = certifUI.height;
    c.volumeInfo.width = certifUI.width;
    c.volumeInfo.depth = certifUI.depth;
    c.volumeInfo.publishDate = new Date(Date.now()).toJSON();
    return c;
  }

  convertToUI(certif: Certif): CertifUI {
    let certifUI = generateMockCertifUi();
    certifUI.id = certif.id;
    certifUI.title = certif.volumeInfo.title;
    certifUI.desc = certif.volumeInfo.desc;
    certifUI.artists = certif.volumeInfo.artists;
    certifUI.galleries = certif.volumeInfo.galleries;
    certifUI.image = certif.volumeInfo.imageLinks?.full;
    certifUI.height = certif.volumeInfo.height;
    certifUI.width = certif.volumeInfo.width;
    certifUI.depth = certif.volumeInfo.depth;
    return certifUI;
  }

  mint(certif: Certif) {
    let n: Nft = generateNft();
    n.image = certif.volumeInfo.imageLinks.full;
    addAttribute(n, 'title', certif.volumeInfo.title);
    addAttribute(n, 'artist', certif.volumeInfo.artists[0]);
    addAttribute(n, 'gallery', certif.volumeInfo.galleries[0]);
    addAttribute(n, 'description ', certif.volumeInfo.desc);
    addAttribute(
      n,
      'size ',
      certif.volumeInfo.height + ' * ' + certif.volumeInfo.width
    );
    console.log(n);
    const dialogRef = this.dialog.open(DialogMint, {
      width: '60%',
      data: { nft: n }
    });
  }
}
