import { TestBed } from '@angular/core/testing';

import { LoginguardGuard } from './loginguard.guard';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppModule } from '../app.module';

describe('LoginguardGuard', () => {
  let guard: LoginguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    });
    guard = TestBed.inject(LoginguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
