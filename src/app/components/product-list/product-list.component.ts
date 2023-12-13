import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products!: IProduct[]
  constructor(
    private productService: ProductService,
    private route: Router) { }
  showSearchInput = false
  searchText: string = "";
  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput
  }
  async ngOnInit() {
    try {
      this.products = await lastValueFrom(this.productService.getProducts())
    } catch (error) {

    }

  }
  async removeProduct(id: number) {
    const confirm = window.confirm("Are you sure?")
    if (confirm) {
      try {
        await lastValueFrom(this.productService.removeProduct(id))
        this.products.filter(p => p.id !== id)
        alert("Removed")
        this.route.navigate(["/admin/product"])

      } catch (error) {

      }
    }

  }
}
