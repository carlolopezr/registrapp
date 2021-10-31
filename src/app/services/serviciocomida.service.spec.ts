import { TestBed } from '@angular/core/testing';

import { ServiciocomidaService } from './serviciocomida.service';

describe('ServiciocomidaService', () => {
  let service: ServiciocomidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciocomidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
