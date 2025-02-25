import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/enviar-correo'; // Asegúrate de configurar tu backend

  constructor(private http: HttpClient) {}

  enviarCorreo(email: string, message: string): Observable<any> {
    const body = { email, message };
    return this.http.post(this.apiUrl, body);
  }
}
