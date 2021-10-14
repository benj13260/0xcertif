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

  async searchCertif(
    addr: string = this.API_PATH,
    startIndex: number,
    stopIndex: number
  ): Promise<Certif[]> {
    console.log('query: ' + startIndex + ' -> ' + stopIndex);
    let c: Certif[] = [];
    for (let index = startIndex; index < stopIndex; index++) {
      console.log(`${this.API_PATH}/${index}`);
      this.http.get<Nft>(`${this.API_PATH}/${index}`).pipe(
        switchMap(() => {
          console.log('hey');
          return null;
          //console.log(JSON.stringify(certif))
          /*  c.push({
                    id: ""+index, 
                    volumeInfo: { nft: certif}
                })
                */
        })
      );
    }
    console.log('c ' + JSON.stringify(c));
    return [];
  }

  retrieveCertif(volumeId: string): Observable<Nft> {
    return this.http.get<Nft>(`${this.API_PATH}/${volumeId}`);
  }
}
