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
    const firebaseConfig = {
        apiKey: "AIzaSyARU3QrivlUt3E-99wKiQXfQFnCevp8fJk",
        authDomain: "ubicacion-abaf1.firebaseapp.com",
        projectId: "ubicacion-abaf1",
        storageBucket: "ubicacion-abaf1.firebasestorage.app",
        messagingSenderId: "652046353241",
        appId: "1:652046353241:web:910739f3a8ff91dd520248"
    };

    const app = initializeApp(firebaseConfig);
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