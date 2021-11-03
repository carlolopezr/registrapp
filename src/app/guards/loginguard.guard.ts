import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ObtenerUserService } from '../services/obtener-user.service';
import { Usuario } from '../interfaces/opcionmenu';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {

  user:Usuario;
  constructor(private userService:ObtenerUserService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioLogeado();
  }
  
  async usuarioLogeado(){
    this.user = await this.userService.obtenerUsuario();
    if(this.user!==null){
      return true;
    }
    else{
      return false
    }
  }
}
