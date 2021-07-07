import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FiltersComponent } from './filters/filters.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ShopComponent, ProductItemComponent, FiltersComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ShopComponent]
})
export class ShopModule { }
