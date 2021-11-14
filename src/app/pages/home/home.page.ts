import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  results: Observable<any>;
  searchTerm = '';

  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
  }

  searchChanged() {
    this.results = this.phoneService.searchData(this.searchTerm);
  }
}
