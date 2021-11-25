import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  phones: Observable<any>;
  listData = [];

  constructor(private http: HttpClient, private dataService: DataService) {
    this.loadData();
  }

  ngOnInit() {

  }

  async loadData() {
    this.dataService.getData().subscribe(res =>
      this.listData = res);
  }

  async removeItem(index) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }
}
