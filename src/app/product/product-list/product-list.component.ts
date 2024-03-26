import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[]=[];
  filteredProducts: Product[]=[];
  searchText: string='';
  sortType: string='';

  currentPage = 1;
  pageSize = 10; // Adjust as per your pagination size

  constructor(private productService: ProductService) { }

 
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

  }

  loadProducts(page: number = 1): void {
    this.productService.getProducts(page, this.pageSize).subscribe(products => {
      this.products = products;
      this.currentPage = page;
    });
  }
  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )

    //this.sortProducts(this.sortOrder)
  }

}
