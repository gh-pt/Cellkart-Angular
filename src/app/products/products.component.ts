import { Component } from '@angular/core';
import { Product } from '../ProductClass/ProductClass';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {
  // products = [
  //   new Product("iphone 16", "Latest iphone in 2024", "Apple", 5, 79900, 100, 10, "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202409/66df413e6190a-iphone-16-and-iphone-16-plus-will-be-available-in-five-bold-colors-black--white--pink--teal--and-ul-094101473-16x9.jpg?size=948:533"),
  //   new Product("iphone 15", "Latest iphone in 2023", "Apple", 5, 79900, 100, 10, "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/i/p/iphone_15_pink_pdp_image_position-1__wwen-removebg-preview_1.png"),
  //   new Product("pixel 9", "Latest pixel phone in 2024", "Google", 5, 79900, 100, 10, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUUWXnjJ2wcvJMNfaP3bSsZ67dSWico7Ksw&s"),
  //   new Product("Moto Edge 50 pro", "Latest Moto Edge series phone in 2024", "Motorola", 4.8, 31990, 100, 10, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsRiqNJjz18_ObENTy_a7r6L-5OoMFKUOAg&s")
  // ]

  products: Product[] = [];

  selectedProduct: Product | undefined;

  // Handle the emitted product from the ProductCardComponent
  onEditProduct(product: Product) {
    this.selectedProduct = product; // Set the selected product
    console.log(this.selectedProduct)
  }

  constructor(private productService:ProductService){

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }

  // deleteProduct(id: number): void {
  //   this.productService.deleteProduct(id).subscribe(() => {
  //     this.products = this.products.filter(p => p.prodId !== id);
  //   });
  // }

  deleteProduct(id:number): void{
    const ans=confirm("Do you really want to delete?")
    if(ans){
      const obs=this.productService.deleteProduct(id)
      obs.subscribe({
        next:(obj)=>{
          console.log(obj);
          window.alert("Employe deleted successfully....");
          this.products = this.products.filter(p => p.prodId !== id);
        },
        error: (err)=>{
          console.log(err); 
          window.alert("something went wrong deleting employee...")
        }
      });
    }
  }

}
