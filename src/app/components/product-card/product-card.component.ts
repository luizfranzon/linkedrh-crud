import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonChip, IonModal, IonContent, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { IProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonContent,
    IonModal,
    IonChip,
    IonButton,
    IonCardSubtitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CurrencyPipe,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonButtons
  ],
})
export class ProductCardComponent {
  deleteProduct = output<void>();

  productData = input.required<IProductModel>()

  handleDeleteProduct() {
    this.deleteProduct.emit();
  }
}
