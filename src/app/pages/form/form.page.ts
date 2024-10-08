import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonInput, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonInput, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect, IonSelectOption, ReactiveFormsModule]
})
export class FormPage implements OnInit {

  productsService = inject(ProductsService)
  router = inject(Router)

  productForm = new FormGroup({
    title: new FormControl('', [ Validators.required ]),
    category: new FormControl('', [ Validators.required ]),
    price: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ]),
    imageUrl: new FormControl('', [ Validators.required ])
  })

  handleSubmit(event: any) {
    console.log(this.productForm.value)
    this.productsService.addProduct({
      title: this.productForm.get('title')!.value!,
      category: this.productForm.get('category')!.value!,
      price: Number(this.productForm.get('price')!.value!),
      description: this.productForm.get('description')!.value!,
      imageUrl: this.productForm.get('imageUrl')!.value!
    }).subscribe(response => {
      this.handleClearForm()
      this.router.navigate(['/products'])
    })
  }

  handleClearForm() {
    this.productForm.reset()
  }

  checkIfFormIsValid() {
    return this.productForm.valid
  }

  constructor() { }

  ngOnInit() {
  }

}
