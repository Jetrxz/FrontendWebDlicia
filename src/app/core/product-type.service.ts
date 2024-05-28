import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tipoProductoTable } from '../models/productType.model';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  urlbackend ="https://localhost:7044/api/v1/ProducType"
  constructor(private http:HttpClient) { }

  listarTipoProductos(state: string): Observable<tipoProductoTable[]> {
    let params = new HttpParams().set('state', state);
    return this.http.get<tipoProductoTable[]>(`${this.urlbackend}`, { params });
  }

  actualizarTipoProductos(obj:tipoProductoTable):Observable<tipoProductoTable>{
    return this.http.put<tipoProductoTable>(this.urlbackend,obj);
  }

  crearTipoProductos<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend, obj);
  }

}
