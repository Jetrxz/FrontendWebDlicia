import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientTable } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  urlbackend = "https://localhost:7044/api/v1/Client"
  constructor(private http: HttpClient) { }

  
  listarClientes(): Observable<ClientTable[]> {
    return this.http.get<ClientTable[]>(`${this.urlbackend}`);
  }

  actualizarCliente(obj:ClientTable):Observable<ClientTable>{
    return this.http.put<ClientTable>(this.urlbackend,obj);
  }

  crearCliente<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend, obj);
  }

  enviarCorreo(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlbackend}/send-email`, formData);
  }
}
