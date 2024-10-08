import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonListHeader,
  IonLabel,
  IonSpinner,
  AlertController,
  IonFab,
  IonFabButton,
  IonIcon,
  ModalController,
  IonFooter,
} from "@ionic/angular/standalone";
import { ProductsService } from "src/app/services/products.service";
import { ProductCardComponent } from "src/app/components/product-card/product-card.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { delay, map } from "rxjs";
import { IProductModel } from "src/app/models/product.model";
import { AddProductModal } from "./ui/add-product-modal/add-product-modal.page";
import { ProductCardSkeletonComponent } from "src/app/components/product-card-skeleton/product-card-skeleton.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
  standalone: true,
  imports: [
    IonFooter,
    IonIcon,
    IonFabButton,
    IonFab,
    IonSpinner,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ProductCardComponent,
    IonRefresher,
    IonRefresherContent,
    IonListHeader,
    IonLabel,
    ProductCardSkeletonComponent,
  ],
  providers: [ProductsService, ModalController],
})
export class ProductsPage {
  products = signal<IProductModel[]>([]);

  productsService = inject(ProductsService);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);

  loadProducts = toSignal(
    this.productsService.listProducts().pipe(
      delay(1000),
      map((products) => {
        this.products.set(products);
        return { isLoading: false };
      })
    ),
    { initialValue: { products: [], isLoading: true } }
  );

  async confirmDeleteProduct(productId: number) {
    const alert = await this.alertCtrl.create({
      message: "Tem certeza que deseja excluir este produto?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Excluir",
          handler: () => this.handleDeleteProduct(productId),
        },
      ],
    });

    await alert.present();
  }

  handleDeleteProduct(productId: number) {
    this.productsService.removeProductById(productId).subscribe((response) => {
      this.products.update((products) =>
        products.filter((product) => product.id !== productId)
      );
    });
  }

  async handleAddProduct() {
    const modal = await this.modalCtrl.create({
      component: AddProductModal,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss<IProductModel>();

    if (role === "confirm") {
      this.products.update((products) => products.concat(data!));
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
