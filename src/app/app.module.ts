import { InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router, ActivatedRoute } from '@angular/router';
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
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { QrscannerPage } from './pages/qrscanner/qrscanner.page';
import { DatePipe } from '@angular/common';
registerLocaleData(localeEs, 'es')



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,} 
    ,{provide: LOCALE_ID, useValue:'es'}, QRScanner, SocialSharing, DatePipe, AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
