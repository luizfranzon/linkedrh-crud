import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IProductModel } from "../models/product.model";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly url = "http://localhost:3000/products"
  
  httpService = inject(HttpClient)
  
  listProducts(): Observable<IProductModel[]> {
    return this.httpService.get<IProductModel[]>(this.url)
  }

  addProduct(product: IProductModel): Observable<IProductModel> {
    return this.httpService.post<IProductModel>(this.url, product)
  }

  removeProductById(id: number): Observable<IProductModel> {
    return this.httpService.delete<IProductModel>(`${this.url}/${id}`)
  }
}