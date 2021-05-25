import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Boutique';

  constructor(private basketService: BasketService, private accountSerive: AccountService) {}
   
  ngOnInit(): void {   
   this.loadbasket();
   this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountSerive.loadCurrentUser(token)
      .subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
    }
  }

  loadbasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(
      () =>{
        console.log('Initialized the current basket');
      },
      error =>{
        console.log(error);
      });
    }
  }
}
