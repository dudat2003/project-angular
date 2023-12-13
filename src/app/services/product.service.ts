import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL: string = `http://localhost:3000/products`
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.API_URL)
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API_URL}/${id}`)
  }

  removeProduct(id: number): Observable<any> {
    return this.http.delete<IProduct>(`${this.API_URL}/${id}`)

  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.API_URL, product)

  }

  updateProduct(product: IProduct) {
    return this.http.put<IProduct>(`${this.API_URL}/${product.id}`, product)
  }

  isProductDetailOpen: boolean = false;
  selectedProduct!: IProduct;

  showDetail(product: IProduct) {
    this.isProductDetailOpen = true
    this.selectedProduct = product
  }

  closeDetail() {
    this.isProductDetailOpen = false
  }
  isProductDetailPopupOpen() {
    return this.isProductDetailOpen
  }
}
