import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { RestablecerContrasenaPage } from './restablecer-contrasena.page';
import { FormsModule } from '@angular/forms';
describe('RestablecerContrasenaPage', () => {
  let component: RestablecerContrasenaPage;
  let fixture: ComponentFixture<RestablecerContrasenaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecerContrasenaPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
