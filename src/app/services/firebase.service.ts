import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: any;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  async guardarUbicacionFirebase(latitud: number, longitud: number) {
    try {
      const ubicacionesRef = collection(this.db, 'ubicaciones');
      const resultado = await addDoc(ubicacionesRef, {
        latitud,
        longitud,
        createdAt: new Date()
      });
      console.log('Guardado en Firebase:', resultado.id);
      return resultado;
    } catch (e) {
      console.error('Error Firebase:', e);
      throw e;
    }
  }
}