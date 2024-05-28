import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tipoUsuariosTable } from '../models/usersType.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {
  urlbackend ="https://localhost:7044/api/v1/UsersType"
  constructor(private http: HttpClient) { }

  listarPerfiles(state: string):Observable<tipoUsuariosTable[]>
  {
    let params = new HttpParams().set('state', state);
    return this.http.get<tipoUsuariosTable[]>(`${this.urlbackend}`, { params });
  } 

  crearPerfil<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend, obj);
  }

  actualizarPerfil<T>(obj:T):Observable<T>{
    return this.http.put<T>(this.urlbackend,obj);
  }
}
