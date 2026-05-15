import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://ihyaggsoitqdocrpvtsu.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWFnZ3NvaXRxZG9jcnB2dHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Nzg5MzQsImV4cCI6MjA5NDM1NDkzNH0.xa1zC-o3OmITp3PMOGbYzcMjrxJZgeahJZxCOglf4l0';

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