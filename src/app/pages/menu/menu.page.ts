import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuItems = [
    {
      title: 'Home',
      icon: 'home-sharp',
      path: '/'
    },
    {
      title: 'Favorites',
      icon: 'star',
      path: '/favorites'
    },
    {
      title: 'About',
      icon: 'information-circle',
      path: '/about'
    }
  ];

  title = 'Home';
  constructor(private menuCtrl: MenuController, private plt: Platform) {

  }

  @HostListener('window:resize', ['$event'])
  private onresize(event) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }

  ngOnInit() {
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  setTitle(title) {
    this.title = title;
  }

  toggleMenu(width) {
    if (width > 768) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
  }
}
