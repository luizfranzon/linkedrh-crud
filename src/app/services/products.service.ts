import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProductModel } from "../models/product.model";

interface AddProduct extends Omit<IProductModel, "id"> {}

interface ListProductsOptions {
  pageNumber?: number;
  limit?: number;
}
@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private readonly url = "http://localhost:3000/products";

  httpService = inject(HttpClient);

  listProducts(
    listProductsOptions?: ListProductsOptions
  ): Observable<IProductModel[]> {
    let url = new URL(this.url);
    if (listProductsOptions && listProductsOptions.pageNumber) {
      url.searchParams.set("_page", listProductsOptions.pageNumber.toString());
      url.searchParams.set(
        "_limit",
        listProductsOptions?.limit?.toString() ?? "3"
      );
    }

    return this.httpService.get<IProductModel[]>(url.href);
  }

  addProduct(product: AddProduct): Observable<IProductModel> {
    return this.httpService.post<IProductModel>(this.url, product);
  }

  removeProductById(id: number): Observable<IProductModel> {
    return this.httpService.delete<IProductModel>(`${this.url}/${id}`);
  }
}
