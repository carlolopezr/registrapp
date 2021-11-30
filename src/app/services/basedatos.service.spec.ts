import { TestBed } from '@angular/core/testing';

import { BasedatosService } from './basedatos.service';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from '../../environments/environment';
import { AppModule } from '../app.module';

describe('BasedatosService', () => {
  let service: BasedatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[AppModule]});
    service = TestBed.inject(BasedatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
