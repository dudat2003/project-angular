import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm = this.formBuilder.group({
    name: [""],
    imgUrl: ["https://picsum.photos/50"],
    price: 0,
    quantity: 0,
    description: [""]
  })
  product!: IProduct
  mode: "create" | "update" = "create"
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private route: Router
  ) { }
  async ngOnInit() {
    const { id } = this.router.snapshot.params
    if (id) {
      this.product = await lastValueFrom(this.productService.getProductById(+id))
      this.productForm.patchValue(this.product)
      this.mode = "update"
    }
  }

  async onSubmit() {
    try {
      if (this.mode === "create") {
        await lastValueFrom(this.productService.addProduct(this.productForm.value as IProduct))
        alert(" Add Completed! ")
      } else {
        await lastValueFrom(this.productService.updateProduct({ ...this.product, ...this.productForm.value } as IProduct))
        alert("Update Completed! ")
      }
      this.route.navigate(["/admin/product"])
    } catch (error: any) {
      console.log(error.message);
    }

  }
}
