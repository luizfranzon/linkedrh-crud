import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonMenuToggle, IonTitle, IonToolbar, IonList, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenu, IonMenuToggle, CommonModule, RouterLink]
})
export class NavigationMenuComponent implements OnInit {

  router = inject(Router)

  readonly navigationItems = [
    { title: 'Home', path: '/home' }, 
    { title: 'List', path: '/list' }, 
    { title: 'Form', path: '/form' }
  ];

  constructor() { }

  navigationTitle = ''

  ngOnInit() {
    this.router.events.subscribe(val => {
      const currentPath = window.location.pathname

      this.navigationItems.forEach(item => {
        if (item.path === currentPath) {
          this.navigationTitle = item.title
        }
      })
    })
  }

}
