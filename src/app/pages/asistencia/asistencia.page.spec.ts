import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AsistenciaPage } from './asistencia.page';
import { AppModule } from '../../app.module';
import { Router, RouterModule } from '@angular/router';

describe('AsistenciaPage', () => {
  let router: Router
  let component: AsistenciaPage;
  let fixture: ComponentFixture<AsistenciaPage>;
  let codigo:string='1';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaPage ],
      imports: [RouterTestingModule, AppModule],
    }).compileComponents();
    /*router = TestBed.inject(Router);
    router.initialNavigation();
    spyOn(router, 'getCurrentNavigation').and.returnValue({ 'extras': { 'state': {cod:codigo} } } as any);*/
    fixture = TestBed.createComponent(AsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
