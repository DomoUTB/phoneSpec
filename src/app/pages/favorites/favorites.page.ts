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
    //this.phones = this.http.get('https://api-mobilespecs.azharimm.site/v2/latest');
  }

  async loadData() {
    // this.listData = await this.dataService.getData();
    this.dataService.getData().subscribe(res =>
      this.listData = res);
  }

  // async addData() {
  //   to implement in phone-details
  //   await this.dataService.addData(this.phones);
  //   this.loadData();
  // }

  async removeItem(index) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }
}
