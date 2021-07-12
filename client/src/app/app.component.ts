import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { BasketService } from './basket/basket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(private basketService: BasketService){}
  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if(basketId) {
      this.basketService.getBasket(basketId).pipe(take(1)).subscribe(()=> {
        console.log('initialized basket')
      }, err => {
        console.log(err);
      })
    }
  }
}
