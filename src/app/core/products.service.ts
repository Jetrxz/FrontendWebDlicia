  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { ProductosTable } from '../models/products.model';

  @Injectable({
    providedIn: 'root'
  })
  export class ProductsService {
    urlbackend ="https://localhost:7044/api/v1/Product"
    constructor(private http:HttpClient) { }

    listarProductos():Observable<ProductosTable[]>
    {
      return this.http.get<ProductosTable[]>(`${this.urlbackend}`);
    } 

    crearProducto<T>(obj: T): Observable<T> {
      console.log(obj);
      return this.http.post<T>(this.urlbackend, obj);
    }

    actualizarProducto(obj:ProductosTable):Observable<ProductosTable>{
      return this.http.put<ProductosTable>(this.urlbackend,obj);
    }

    actualizarImagen(idProduct: number, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('ImageProduct', file);
      return this.http.put<any>(`${this.urlbackend}/${idProduct}/agregar-imagen`, formData);
    }
  }
