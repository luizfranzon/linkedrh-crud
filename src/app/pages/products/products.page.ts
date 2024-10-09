import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from "@angular/core";
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
  RefresherEventDetail,
  ToastController,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/angular/standalone";
import { ProductsService } from "src/app/services/products.service";
import { ProductCardComponent } from "src/app/components/product-card/product-card.component";
import { catchError, delay, map, of } from "rxjs";
import { IProductModel } from "src/app/models/product.model";
import { AddProductModal } from "./ui/add-product-modal/add-product-modal.page";
import { ProductCardSkeletonComponent } from "src/app/components/product-card-skeleton/product-card-skeleton.component";
import {
  IonInfiniteScrollCustomEvent,
  IonRefresherCustomEvent,
} from "@ionic/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
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
export class ProductsPage implements OnInit {
  products = signal<IProductModel[]>([]);
  isLoading = signal<boolean>(false);

  productCounterMessage = computed(
    () => `Total de produtos: ${this.products().length}`
  );

  minSkeletonOnScreen = signal(Array.from({ length: 5 }, (_, i) => i));
  disableInfintScroll = signal(false);

  private productsService = inject(ProductsService);
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  private currentPaginationPage = signal(1);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(infinitScrollEvent?: IonInfiniteScrollCustomEvent<void>) {
    if (!infinitScrollEvent) {
      this.toggleLoading();
    }
    this.productsService
      .listProducts({ pageNumber: this.currentPaginationPage() })
      .pipe(
        delay(1000),
        catchError(() => {
          this.presentErrorToast();
          return of([]);
        })
      )
      .subscribe((products) => {
        if (!infinitScrollEvent) {
          this.toggleLoading();
        }
        this.currentPaginationPage.update((currentPage) => currentPage + 1);
        this.products.update((p) => p.concat(products));

        if (infinitScrollEvent) {
          infinitScrollEvent.target.complete();

          if (!products.length) {
            this.disableInfintScroll.set(true);
          }
        }
      });
  }

  toggleLoading() {
    this.isLoading.update((isLoading) => !isLoading);
  }

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

  handleRefresh(loadingEvent: IonRefresherCustomEvent<RefresherEventDetail>) {
    this.products.set([]);
    this.currentPaginationPage.set(1);
    this.disableInfintScroll.set(false);

    this.loadProducts();
    loadingEvent.target.complete();
  }

  async presentErrorToast() {
    const toast = await this.toastCtrl.create({
      message: "Ocorreu um erro ao carregar os produtos.",
      duration: 5000,
      position: "bottom",
      color: "danger",
    });

    await toast.present();
  }
}
