import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IBrandsAndTypes } from '../shared/models/brandsAndTypes';
import { IPagination } from '../shared/models/pagination';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"
  constructor(private http: HttpClient) { }

  getProducts(shopParams:ShopParams) {
    let params = new HttpParams();
    if(shopParams.brandId){
      params = params.append('brandId',shopParams.brandId.toString());
    }
    if(shopParams.typeId){
      params = params.append('typeId',shopParams.typeId.toString());
    }
    if(shopParams.search){
      params = params.append('search',shopParams.search)
    }
    params = params.append('sort',shopParams.sort)
    params = params.append('pageIndex',shopParams.pageNumber.toString());
    params = params.append('pageSize',shopParams.pageSize.toString());
    
    return this.http.get<IPagination>(
      `${this.baseUrl}products`
      ,{observe: 'response',params})
      .pipe(map(res => res.body))
  }
  getBrands() {
    return this.http.get<IBrandsAndTypes[]>(`${this.baseUrl}products/brands`)
  }
  getTypes() {
    return this.http.get<IBrandsAndTypes[]>(`${this.baseUrl}products/types`)
  }
}
