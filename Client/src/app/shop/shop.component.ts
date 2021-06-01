import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/producttype';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    {name:'Alphabetical', value:'name'},
    {name:'Price: Low to High', value:'priceAsc'},
    {name:'Price: High to Low', value:'priceDesc'}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
   }

  ngOnInit(): void {  
    this.getProducts();
    this.getBrands();
    this.getTypes(); 
  }

  getProducts(){
    this.shopService.getProducts().subscribe(
      response => {
        this.products = response.data;
        this.totalCount = response.count},
      error =>{console.log(error);}
    );
  }

  getBrands(){
    this.shopService.getBrands().subscribe(
      response => {this.brands = [{id:0, name:'All'}, ...response]},
      error => {console.log(error);}
    );    
  }

  getTypes(){
    this.shopService.getTypes().subscribe(
     response => {this.types = [{id:0, name:'All'}, ...response]},
     error => {console.log(error)}
    );
  }

  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  OnTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any){
    //IF condition is added to avoid calling the getproducts() method twice, because when the
    //filter is applied, in the pagination the total count changes which also causes
    //the (pageChanged) event to trigger (which is not intended). So the getProducts() is called
    //twice - first time the filter is called and second because of the (pageChanged) event in
    //pagination module trigger. Thus here we are checking whether pagenumber is same or not.
    //This is discussed in the section-104 - resolving bugs.
    const params = this.shopService.getShopParams();
    if(params.pageNumber != event)
    {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts();
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    const params = new ShopParams();
    this.shopService.setShopParams(params);
    this.getProducts();
  }

}
