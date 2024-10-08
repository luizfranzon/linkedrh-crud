import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonRefresher, IonRefresherContent, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { ProductsService } from 'src/app/services/products.service';
import { IProductModel } from 'src/app/models/product.model';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ProductCardComponent, IonRefresher, IonRefresherContent, IonListHeader, IonLabel],
  providers: [ProductsService]
})
export class ListPage implements OnInit {

  productsService = inject(ProductsService)

  products: IProductModel[] = []

  destroyRef = inject(DestroyRef);

  constructor() { }

  getProducts() {
    this.productsService.listProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => this.products = response)
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getProducts()
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
    this.getProducts()
  }

}
