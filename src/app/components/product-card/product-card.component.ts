import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonChip, IonModal, IonContent, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { IProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: true,
  imports: [IonContent, IonModal, IonChip, IonButton, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CurrencyPipe, IonIcon, IonToolbar, IonTitle, IonButtons],
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  productData = input.required<IProductModel>()
  productsService = inject(ProductsService)
  onProductDelete = output()

  handleDeleteProduct() {
    const productId = this.productData().id;

    if (productId !== undefined) {
      this.productsService.removeProductById(productId).subscribe(response => {
        this.onProductDelete.emit()
      });
    }
  }

  constructor() { }

  ngOnInit() {}

}
