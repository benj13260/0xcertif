import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { asyncScheduler, from, Observable, of, scheduled } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Certif, Nft } from './certif';

@Injectable({
  providedIn: 'root'
})
export class CertifService {
  private API_PATH =
    'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq';

  constructor(private http: HttpClient) {}

  retrieveCertif(volumeId: string): Observable<Nft> {
    return this.http.get<Nft>(`${this.API_PATH}/${volumeId}`);
  }
}
