import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  JsonpClientBackend
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { asyncScheduler, from, Observable, of, scheduled } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environmentProp } from '../../app.properties';

import { Certif, Nft } from './certif';

@Injectable({
  providedIn: 'root'
})
export class CertifService {
  private API_PATH =
    'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq';

  private PINATA_BASE_URL = 'https://gateway.pinata.cloud/ipfs/';
  private INFURA_BASE_URL = 'https://ipfs.infura.io/ipfs/';
  private IMAGE_UPLOAD_URL =
    'http://localhost:5001/certif-backend/us-central1/app/upload';
  //'https://api.pinata.cloud/pinning/pinFileToIPFS';

  constructor(
    private http: HttpClient //private db: AngularFireDatabase
  ) {}

  // Retrieve certificate from NFT URI
  retrieveCertif(volumeId: string): Observable<Nft> {
    return this.http.get<Nft>(`${this.API_PATH}/${volumeId}`);
  }

  // Upload file to Pinata
  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.IMAGE_UPLOAD_URL, formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        pinata_api_key: environmentProp.PINATA_API_KEY,
        pinata_secret_api_key: environmentProp.PINATA_API_KEY_SECRET
      }
    });
  }

  // Get full image URL
  public getPinataUrl(hash: string) {
    return this.INFURA_BASE_URL + hash;
  }
}
