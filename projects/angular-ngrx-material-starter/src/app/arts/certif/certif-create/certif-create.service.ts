import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';
import {
  Certif,
  CertifUI,
  generateMockCertif,
  generateMockCertifUi
} from '../certif';

const INITIAL_DATA: Certif[] = [
  {
    id: uuid(),
    volumeInfo: {
      title: 'Sharpy',
      artists: ['Mist'],
      galleries: ['Kolly gallery'],
      imageLinks: {
        full: 'https://firebasestorage.googleapis.com/v0/b/webapp-c075f.appspot.com/o/assets%2F1.jpg?alt=media&token=fa42ae47-7b61-4d5e-8c2e-6039220a9d6a'
      }
    }
  },
  {
    id: uuid(),
    volumeInfo: {
      title: 'Sharpy1',
      artists: ['MadC'],
      galleries: ['Gallery X'],
      imageLinks: {
        full: 'https://firebasestorage.googleapis.com/v0/b/webapp-c075f.appspot.com/o/assets%2F1.jpg?alt=media&token=fa42ae47-7b61-4d5e-8c2e-6039220a9d6a'
      }
    }
  },
  {
    id: uuid(),
    volumeInfo: {
      title: 'Sharpy2',
      artists: ['Mist'],
      galleries: ['Kolly gallery'],
      imageLinks: {
        full: 'https://firebasestorage.googleapis.com/v0/b/webapp-c075f.appspot.com/o/assets%2F1.jpg?alt=media&token=fa42ae47-7b61-4d5e-8c2e-6039220a9d6a'
      }
    }
  }
];

@Injectable()
export class CertifCreateService {
  certifs$: Observable<Certif[]>;

  private model: Model<Certif[]>;

  constructor(private modelFactory: ModelFactory<Certif[]>) {
    this.model = this.modelFactory.create([...INITIAL_DATA]);
    this.certifs$ = this.model.data$;
  }

  addCertif(certif: Partial<Certif>) {
    let certifs = this.model.get();

    certifs.reverse().push({ ...certif, id: uuid() } as Certif);

    this.model.set(certifs.reverse());
  }

  updateCertif(certif: Certif) {
    const certifs = this.model.get();

    const indexToUpdate = certifs.findIndex((u) => u.id === certif.id);
    certifs[indexToUpdate] = certif;

    this.model.set(certifs);
  }

  removeCertif(id: string) {
    const certifs = this.model.get();

    const indexToRemove = certifs.findIndex((user) => user.id === id);
    certifs.splice(indexToRemove, 1);

    this.model.set(certifs);
  }

  convert(certifUI: CertifUI): Certif {
    let c = generateMockCertif();
    c.id = certifUI.id;
    c.volumeInfo.title = certifUI.title;
    c.volumeInfo.galleries = certifUI.galleries;
    c.volumeInfo.artists = certifUI.artists;
    c.volumeInfo.imageLinks = { full: certifUI.image };
    return c;
  }

  convertToUI(certif: Certif): CertifUI {
    let certifUI = generateMockCertifUi();
    certifUI.id = certif.id;
    certifUI.title = certif.volumeInfo.title;
    certifUI.artists = certif.volumeInfo.artists;
    certifUI.galleries = certif.volumeInfo.galleries;
    certifUI.image = certif.volumeInfo.imageLinks.full;
    return certifUI;
  }
}
