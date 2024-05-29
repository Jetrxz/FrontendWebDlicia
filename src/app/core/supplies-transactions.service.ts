import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { transaccionesInsumosTable } from '../models/suppliesTransactions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliesTransactionsService {
  urlbackend ="https://localhost:7044/api/v1/SuppliesTransactions"
  constructor(private http: HttpClient) { }

  buscarRegistros(dfecini: any, dfecfin: any):Observable<transaccionesInsumosTable[]>
  {
    let params = new HttpParams().set('dfecini', dfecini).set('dfecfin', dfecfin);
    return this.http.get<transaccionesInsumosTable[]>(`${this.urlbackend}`, { params });
  } 

  registrarTransaccion<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend, obj);
  }

  exportarRegistros(dfecini: any, dfecfin: any): Observable<Blob> {
    let params = new HttpParams().set('dfecini', dfecini).set('dfecfin', dfecfin);
    return this.http.get(`${this.urlbackend}/export`, { params, responseType: 'blob' });
  }
}
