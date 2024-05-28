import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InsumosTable } from '../models/supplies.model';
import { tipoUnidadTable } from '../models/unitOfMesure.model';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  urlbackend ="https://localhost:7044/api/v1/Supplie"
  urlbackend2 ="https://localhost:7044/api/v1/UnitOfMesure"
  constructor(
    private http:HttpClient
  ) { }
  /*Trae la lista*/
  listarInsumos():Observable<InsumosTable[]>
  {
    return this.http.get<InsumosTable[]>(`${this.urlbackend}`);
  } 

  listarUnidades():Observable<tipoUnidadTable[]>
  {
    return this.http.get<tipoUnidadTable[]>(`${this.urlbackend2}`);
  } 

  crearInsumo<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend, obj);
  }

  actualizarInsumo<T>(obj:T):Observable<T>{
    return this.http.put<T>(this.urlbackend,obj);
  }
}
