import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  products: Observable<any>;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.products = this.http.get('https://api-mobilespecs.azharimm.site/v2/latest');
  }
}
