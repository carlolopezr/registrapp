import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {



  constructor(public firestore: AngularFirestore) {

  }

  createDocument<tipo>(data: tipo, enlace: string, id: string) {
    const itemsCollection: AngularFirestoreCollection<tipo> =
      this.firestore.collection<tipo>(enlace);
    return itemsCollection.doc(id).set(data)
  }

  deleteDocument() {

  }

  getDocument() {

  }

  editDocument() {

  }

  createID() {
    return this.firestore.createId()
  }

  getCollectionChanges<tipo>(enlace: string): Observable<tipo[]> {
    const ref: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(enlace);
    return ref.valueChanges();

  }

  getCollectionQuery<tipo>(enlace: string, parametro: string, busqueda: any): Observable<tipo[]> {
    const itemsCollection: AngularFirestoreCollection<tipo> = 
    this.firestore.collection<tipo>(enlace, ref => ref.where(parametro,'==',busqueda));
    
    return itemsCollection.valueChanges();
  }
}
