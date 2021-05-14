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
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name:'Alphabetical', value:'name'},
    {name:'Price: Low to High', value:'priceAsc'},
    {name:'Price: High to Low', value:'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {  
    this.getProducts();
    this.getBrands();
    this.getTypes(); 
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(
      response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  OnTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    //IF condition is added to avoid calling the getproducts() method twice, because when the
    //filter is applied, in the pagination the total count changes which also causes
    //the (pageChanged) event to trigger (which is not intended). So the getProducts() is called
    //twice - first time the filter is called and second because of the (pageChanged) event in
    //pagination module trigger. Thus here we are checking whether pagenumber is same or not.
    //This is discussed in the section-104 - resolving bugs.
    if(this.shopParams.pageNumber != event)
    {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
