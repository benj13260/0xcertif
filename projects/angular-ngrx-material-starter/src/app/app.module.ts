import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { CustomFmtModule } from './core/ethers/custom-format.module';

import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from '../environments/firebase-config';
import {
  AngularFirestore,
  AngularFirestoreModule
} from '@angular/fire/compat/firestore';
import { CertifsModule } from './arts/certif/certifs.module';
import { environmentProp } from './app.properties';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    AngularFireModule.initializeApp(environmentProp.firebaseConfig),
    AngularFirestoreModule,
    CertifsModule,
    // core
    CoreModule,
    CustomFmtModule,
    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
