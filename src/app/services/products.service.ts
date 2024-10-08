import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProductModel } from "../models/product.model";

interface AddProduct extends Omit<IProductModel, "id"> {}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly url = "http://localhost:3000/products"
  
  httpService = inject(HttpClient)
  
  listProducts(): Observable<IProductModel[]> {
    return this.httpService.get<IProductModel[]>(this.url)
  }

  addProduct(product: AddProduct): Observable<IProductModel> {
    return this.httpService.post<IProductModel>(this.url, product)
  }

  removeProductById(id: number): Observable<IProductModel> {
    return this.httpService.delete<IProductModel>(`${this.url}/${id}`)
  }
}