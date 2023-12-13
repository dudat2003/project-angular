import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  products!: IProduct[]
  pagedProduct!: IProduct[]


  currentPage = 1
  constructor(public productService: ProductService) { }
  async ngOnInit() {
    try {
      this.products = await lastValueFrom(this.productService.getProducts())

    } catch (error) {

    }
  }

  openPopup(product: IProduct): void {
    this.productService.showDetail(product)

  }
}
