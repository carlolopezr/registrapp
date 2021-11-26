import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { Usuario } from '../../interfaces/opcionmenu';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router
  let usuario:Usuario={
    username:'1',
    password:'2',
    estado:0
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();
    router = TestBed.inject(Router);
    router.initialNavigation();
    spyOn(router, 'getCurrentNavigation').and.returnValue({ 'extras': { 'state': {miUsuario:usuario} } } as any);
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
