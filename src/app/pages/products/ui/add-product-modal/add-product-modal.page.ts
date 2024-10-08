import { first } from "rxjs";
import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  ModalController,
  IonNav,
  IonFooter,
  IonButtons,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-form",
  templateUrl: "./add-product-modal.page.html",
  styleUrls: ["./add-product-modal.page.scss"],
  standalone: true,
  imports: [
    IonButtons,
    IonFooter,
    IonNav,
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
  ],
  providers: [ModalController],
})
export class AddProductModal implements OnInit {
  productsService = inject(ProductsService);
  modalCtrl = inject(ModalController);

  productForm = new FormGroup({
    title: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    imageUrl: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  handleSubmit() {
    const product = this.productForm.getRawValue();
    this.productsService
      .addProduct(product)
      .pipe(first())
      .subscribe((response) => {
        this.handleClearForm();
        this.modalCtrl.dismiss({ ...product, id: response.id }, "confirm");
      });
  }

  handleCloseModal() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  handleClearForm() {
    this.productForm.reset();
  }

  checkIfFormIsValid() {
    return this.productForm.valid;
  }

  constructor() {}

  ngOnInit() {}
}
