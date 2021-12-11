import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  show = true;
  listData = [];

  constructor(private http: HttpClient, private dataService: DataService) {
    this.loadData();
  }

  ngOnInit() {

  }

  async loadData() {
    this.dataService.getData().subscribe(res => this.listData = res);
  }

  async removeItem(index) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }

  async doRefresh(event) {
    console.log('Refreshing...');
    this.show = false;
    await this.loadData();
    setTimeout(() => {
      console.log('Refreshed.');
      this.show = true;
      event.target.complete();
    }, 1000);
  }
}
