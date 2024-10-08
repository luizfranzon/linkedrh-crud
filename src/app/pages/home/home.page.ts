import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonCard, IonCardContent, IonAvatar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonAvatar, IonCardContent, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonImg],
})
export class HomePage {

  router = inject(Router)

  constructor() {}

  handleRedirectToProducts() {
    this.router.navigate(['/products'])
  }

  handleRedirectToForm() {
    this.router.navigate(['/form'])
  }
}
