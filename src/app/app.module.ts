import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore,AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { IonicStorageModule } from '@ionic/storage-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { FooterComponent } from './components/footer/footer.component';
import  localeEs  from '@angular/common/locales/es'
import { registerLocaleData} from '@angular/common'
registerLocaleData(localeEs, 'es')



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,} 
    ,{provide: LOCALE_ID, useValue:'es'}, QRScanner,],
  bootstrap: [AppComponent],
})
export class AppModule {}
