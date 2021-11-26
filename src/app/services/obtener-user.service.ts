import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/opcionmenu';

@Injectable({
  providedIn: 'root'
})
export class ObtenerUserService {

  usuario:Usuario;
  constructor(private storage:Storage) {
    this.storage.create()
   }

   async obtenerUsuario(){
    const usernames = await this.storage.keys();
    for (let index = 0; index < usernames.length; index++) {
      const username = usernames[index];
      this.usuario = await this.storage.get(username)
      if (this.usuario.estado == 1) {
        return this.usuario
      }

    }
    return null;
   }
}
