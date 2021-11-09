import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Certif, Gallery, Nft } from './certif';

const collArtists = 'artists';
const collCertifs = 'certifs';
const collGalleries = 'galleries';

@Injectable({
  providedIn: 'root'
})
export class CertifService {
  private API_PATH =
    'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq';
  private INFURA_BASE_URL = 'https://ipfs.infura.io/ipfs/';
  private IMAGE_UPLOAD_URL =
    'https://us-central1-certif-backend.cloudfunctions.net/app/upload';

  db: any;

  constructor(
    private http: HttpClient, //private db: AngularFireDatabase
    private afs: AngularFirestore
  ) {
    this.db = this.afs.firestore;
  }

  //Get Artists
  async getArtists(): Promise<string[]> {
    let artists: string[] = new Array();
    const artistsRef = collection(this.db, collArtists);
    const q = query(artistsRef, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      artists.push(doc.get('name'));
    });
    return artists;
  }

  // Add Gallery
  async addGallery(g: Gallery) {
    // Add a new document in collection "cities"
    console.log(g);
    const docRef = await addDoc(
      collection(this.db, collGalleries),
      g.volumeInfo
    );
    console.log('Document written with ID: ', docRef.id);
  }

  // Add Gallery
  async getGallery() {
    //: Promise<Gallery>
    // Add a new document in collection "cities"
    const collRef = collection(this.db, collGalleries);
    const q = query(collRef, where('owner', '==', 'Kolly'));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0]);
  }

  async getCertif(id: any): Promise<Certif> {
    const certifRef = doc(this.db, collCertifs, id);
    const docSnap = await getDoc(certifRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return <Certif>docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  }

  getCertifs(id: any): Observable<Certif[]> {
    let l = this.afs.collection<Certif>(collCertifs);
    return l.valueChanges();
  }

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
      observe: 'events'
    });
  }

  // Get full image URL
  public getPinataUrl(hash: string) {
    return this.INFURA_BASE_URL + hash;
  }
}
