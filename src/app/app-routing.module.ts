import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductInputComponent } from './product-input/product-input.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProductsComponent
  },
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: 'addProduct',
    component: ProductInputComponent
  },
  {
    path: 'editProduct/:prodId',
    component: ProductInputComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
