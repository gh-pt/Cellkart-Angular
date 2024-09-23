import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../ProductClass/ProductClass';
import { ProductService } from '../services/product.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  searchInput = new Subject<string>();

  constructor(private productService: ProductService) {
    // Debouncing the search input to reduce the number of API calls
    this.searchInput
      .pipe(debounceTime(300)) // Wait 300ms after the last keystroke before making the API call
      .subscribe((searchTerm: string) => {
        this.performSearch(searchTerm);
      });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = [...this.products]; // Initially display all products
    });
  }

  onSearchInputChange(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value; // Update search term
    this.searchInput.next(this.searchTerm); // Emit new search term
  }

  clearSearch() {
    this.searchTerm = ''; // Clear the search term
    this.filteredProducts = [...this.products]; // Reset to show all products
  }

  performSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredProducts = [...this.products]; // Reset to all products if the search term is empty
    } else {
      // Call the API to perform the search
      const obs = this.productService.searchProducts(searchTerm);
      obs.subscribe({
        next: (product) => {
          this.filteredProducts = product;
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }

  deleteProduct(id: number): void {
    const ans = confirm('Do you really want to delete?');
    if (ans) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Product deleted successfully.');
          this.filteredProducts = this.filteredProducts.filter(p => p.prodId !== id);
        },
        error: (err) => {
          console.log(err);
          alert('Something went wrong while deleting the product.');
        }
      });
    }
  }

  ngOnDestroy() {
    this.searchInput.complete();
  }
}
