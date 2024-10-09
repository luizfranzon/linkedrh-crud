import { Component } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonChip,
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSkeletonText,
  IonThumbnail,
  IonListHeader,
  IonImg,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-product-card-skeleton",
  templateUrl: "./product-card-skeleton.component.html",
  styleUrls: ["./product-card-skeleton.component.scss"],
  standalone: true,
  imports: [
    IonImg,
    IonListHeader,
    IonSkeletonText,
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
    IonButtons,
    IonThumbnail,
  ],
})
export class ProductCardSkeletonComponent {
  constructor() {}
}
