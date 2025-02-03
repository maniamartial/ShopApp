import {TestBed} from '@angular/core/testing'
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import {ProductService} from './product.service';
import {Product, Category} from '../models/product'


describe('ProductService', ()=>{
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://api.escuelajs.co/api/v1';


 beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ProductService],
  });

  service = TestBed.inject(ProductService);
  httpMock = TestBed.inject(HttpTestingController)
 });

 afterEach(() => {
  httpMock.verify();
 });

 it('should fetch categories', () =>{
  const dummyCategories: Category[] = [
    {id: 1, name: 'Electronics'},
    {id:2, name:'Clothing'},
  ];

  service.getCategories().subscribe(categories => {
    expect(categories.length).toBe(2);
    expect(categories).toEqual(dummyCategories);
  });

  const req = httpMock.expectOne(`${apiUrl}/categories`);
  expect(req.request.method).toBe('GET');
  req.flush(dummyCategories)
 });

 it('should fetch product', () => {
  const dummyProducts: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, image: 'img1.jpg', categoryId: 1, images: [] },
    { id: 2, name: 'Shirt', price: 20, image: 'img2.jpg', categoryId: 2, images: [] },
  ];

  service.getProducts().subscribe(products => {
    expect(products.length).toBe(2);
    expect(products).toEqual(dummyProducts);
  });

  const req = httpMock.expectOne(`${apiUrl}/products`);
  expect(req.request.method).toBe('GET');
  req.flush(dummyProducts);
 });

 it('should fetch a single product by ID', () => {
  const dummyProduct: Product = { id: 1, name: 'Laptop', price: 1000, image: 'img1.jpg', categoryId: 1, images: [] };

  service.getProductById(1).subscribe(product => {
    expect(product).toEqual(dummyProduct);
  });

  const req = httpMock.expectOne(`${apiUrl}/products/1`);
  expect(req.request.method).toBe('GET');
  req.flush(dummyProduct);
});

 it('should handle API errors', () => {
  service.getProducts().subscribe(() => 
  fail('Expected an error'),
   error => expect(error).toContain('API returned code 500')
);

const req = httpMock.expectOne(`${apiUrl}/products`);
req.flush('Internal Server Error', {status:500, statusText:'Server Error'})
 })
})
