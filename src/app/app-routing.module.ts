import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductManagementPageComponent } from './pages/admin/product-management-page/product-management-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

const routes: Routes = [

  {
    path: "", component: BaseLayoutComponent, children: [
      { path: "", component: HomePageComponent },
      { path: "about", component: AboutPageComponent },
      { path: "contact", component: ContactPageComponent },
      { path: "product", component: ProductPageComponent },
      { path: "product/:id", component: DetailProductComponent },
      { path: "signup", component: SignupComponent },
      { path: "signin", component: SigninComponent },

    ]
  },
  {
    path: "admin", component: AdminLayoutComponent, children: [
      {
        path: "", redirectTo: "dashboard", pathMatch: "full"
      },

      { path: "dashboard", component: DashboardComponent },
      { path: "product", component: ProductManagementPageComponent },
      { path: "product/add", component: ProductFormComponent },
      { path: "product/:id/edit", component: ProductFormComponent },



    ]
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
