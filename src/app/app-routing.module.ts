import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductInputComponent } from './product-input/product-input.component';
import { authGuard } from './guards/AuthGuard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProductsComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: 'addProduct',
    component: ProductInputComponent,
    canActivate:[authGuard],

  },
  {
    path: 'editProduct/:prodId',
    component: ProductInputComponent,
    canActivate:[authGuard],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
