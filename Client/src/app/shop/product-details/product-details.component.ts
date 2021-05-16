import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/products';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;

  constructor(private shopService: ShopService, 
              private activateRoute: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {  
      this.breadcrumbService.set('@ProductDetails', ' ');
              }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(
      response => {
        this.product = response;
        this.breadcrumbService.set('@ProductDetails', this.product.name)},
      error => {console.log(error)}
    );
  }

}
