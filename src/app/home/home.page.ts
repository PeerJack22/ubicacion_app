import { Component, OnInit, signal } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { LocationService } from '../services/location';
import { FirebaseService } from '../services/firebase.service';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonIcon, NgIf
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);
  errorMsg = signal<string | null>(null);

  constructor(
    private loc: LocationService,
    private firebase: FirebaseService,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    await this.loc.ensurePermissions();
    await this.obtenerUbicacionActual();
  }

  async obtenerUbicacionActual() {
    try {
      const pos = await this.loc.getCurrentPosition();
      this.latitude.set(pos.coords.latitude);
      this.longitude.set(pos.coords.longitude);
      this.errorMsg.set(null);

      await this.firebase.guardarUbicacionFirebase(
        pos.coords.latitude,
        pos.coords.longitude
      );
      await this.supabase.guardarUbicacion(
        pos.coords.latitude,
        pos.coords.longitude
      );  
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'Error al obtener la ubicación actual');
    }
  }

  abrirEnGoogleMaps() {
    if (this.latitude() !== null && this.longitude() !== null) {
      const url = `https://www.google.com/maps/search/?api=1&query=${this.latitude()},${this.longitude()}`;
      window.open(url, '_blank');
    }
  }
}