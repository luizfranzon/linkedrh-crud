import { Component, OnInit } from '@angular/core';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  standalone: true,
  imports: [IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenu]
})
export class NavigationMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
