import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../ProductClass/ProductClass'; // Import the Product model

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:5001/api/product'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+'/getAllProd');
  }

  // Get a single product by ID
  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl+'/getProdById'}/${id}`;
    return this.http.get<Product>(url);
  }

  // Create a new product
  createProduct(productFormData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addProd`, productFormData);
  }

  // Update an existing product by ID
  updateProduct(prodId: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/updateProd/${prodId}`, formData);
  }
  
  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl+'/deleteProd'}/${id}`;
    return this.http.delete<void>(url);
  }

  // Search a product by Name
  searchProducts(searchTerm: string): Observable<Product[]> {
    const url = `${this.apiUrl+'/searchProducts'}/${searchTerm}`;
    return this.http.get<Product[]>(url); // Assuming your API supports a query parameter for search
  }
}
