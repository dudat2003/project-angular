import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
  product!: IProduct
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService) { }
  async ngOnInit() {
    const id = this.router.snapshot.paramMap.get("id")
    if (id) {
      try {
        this.product = await lastValueFrom(this.productService.getProductById(+id))
      } catch (error) {
        console.log(error);
      }
    }
  }
  closeDetail() {
    this.productService.closeDetail()
  }
}
