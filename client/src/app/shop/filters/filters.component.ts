import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBrandsAndTypes } from 'src/app/shared/models/brandsAndTypes';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() onSelectBrand: EventEmitter<number> = new EventEmitter();
  @Output() onSelectType: EventEmitter<number> = new EventEmitter();
  @Output() onSelectSortBy: EventEmitter<string> = new EventEmitter();

  selectedBrandId = 0;
  selectedTypeId = 0;
  selectedSortBy = "name";
  brands: IBrandsAndTypes[] = [];
  types: IBrandsAndTypes[] = [];
  sortOptions = [
    {name: 'Alphabetical',value : 'name'},
    {name: 'Price: Low to High',value : 'priceAsc'},
    {name: 'Price: High to Low',value : 'priceDesc'},
  ]
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
  }
  getBrands(){
    this.shopService.getBrands().subscribe( res => {
      this.brands = [{id:0,name:'All'},...res];
    }, err => console.log(err))
  }
  getTypes(){
    this.shopService.getTypes().subscribe( res => {
      this.types =  [{id:0,name:'All'},...res];
    }, err => console.log(err))
  }
  selectBrand(brand : number){
    this.selectedBrandId = brand;
    this.onSelectBrand.emit(brand)
  }
  selectType(type : number){
    this.selectedTypeId = type
    this.onSelectType.emit(type);
  }
  selectSortBy(event:any) {
    this.selectedSortBy = event.value;
    this.onSelectSortBy.emit(event.value);
  }
}
