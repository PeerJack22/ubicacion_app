import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const { supabaseUrl, supabaseKey } = environment;

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
  }

  async guardarUbicacion(latitud: number, longitud: number) {
    try {
      const { data, error } = await this.supabase
        .from('ubicaciones')
        .insert([
          {
            latitud,
            longitud,
            created_at: new Date()
          }
        ])
        .select();

      if (error) {
        console.error('Error al guardar:', error);
        throw error;
      }
      
      console.log('Ubicación guardada:', data);
      return data;
    } catch (e) {
      console.error('Error:', e);
      throw e;
    }
  }

  async obtenerUbicaciones() {
    const { data, error } = await this.supabase
      .from('ubicaciones')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}