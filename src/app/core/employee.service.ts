import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosTable } from '../models/users.model';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/contantes';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private urlbackend = `${API_URL}/Users`;

  constructor(private http: HttpClient) { }

  listarEmpleados(state: boolean): Observable<UsuariosTable[]> {
    let params = new HttpParams().set('state', state);
    return this.http.get<UsuariosTable[]>(`${this.urlbackend}`, { params });
  }
  crearEmpleado<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend, obj);
  }

  actualizarEmpleados(obj:UsuariosTable):Observable<UsuariosTable>{
    const stateAsString = obj.state.toString();
    obj.state = (stateAsString === 'true' || obj.state === true);
    return this.http.put<UsuariosTable>(this.urlbackend,obj);
  }
}
