import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryPageComponent implements OnInit {
  categoryId: number | null = null;
  products: any[] = [];
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));

    if (this.categoryId) {
      this.productService.getProductsByCategory(this.categoryId).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
