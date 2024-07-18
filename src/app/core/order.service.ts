import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/contantes';
import { OrderTable } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlbackend = `${API_URL}/Order`;
  private urlbackend2 = `${API_URL}/OrderDetail`;

  constructor(private http: HttpClient) { }

  listarPedidos(): Observable<OrderTable[]> {
    return this.http.get<OrderTable[]>(`${this.urlbackend}`);
  }

  crearPedido<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend, obj);
  }

  crearDetallePedido<T>(obj: T): Observable<T> {
    return this.http.post<T>(this.urlbackend2, obj);
  }
}
