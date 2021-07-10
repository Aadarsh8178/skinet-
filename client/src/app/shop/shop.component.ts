import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false })
  searchTerm!: ElementRef;
  products: IProduct[] | undefined;
  shopParams = new ShopParams();
  totalCount=0;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe( res => {
      if(res){
        this.products = res.data;
        this.shopParams.pageNumber = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
      }
    }, err => console.log(err))
  }
  selectBrand(brand: number){
    this.shopParams.brandId = brand
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  selectType(type: number){
    this.shopParams.typeId = type
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  selectSortBy(sortBy:string){
    this.shopParams.sort = sortBy;
    this.getProducts();
  }
  onPageChanged(event: number){
    if(this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event
      this.getProducts();
    } 
  }
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
