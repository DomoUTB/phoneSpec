import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.page.html',
  styleUrls: ['./phone-details.page.scss'],
})
export class PhoneDetailsPage implements OnInit {

  slug: string;
  information = null;
  listData = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private phoneService: PhoneService,
    private dataService: DataService) {
      this.loadData();
    }

  ngOnInit() {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.phoneService.getDetails(this.slug).subscribe(result => {
      this.information = result;
      console.log('Phone Name: ', this.information.data.phone_name);
    });
  }

  openWebsite() {
    window.open(this.information.data.phone_images[0], '_blank');
  }

  async loadData() {
    // this.listData = await this.dataService.getData();
    this.dataService.getData().subscribe(res =>
      this.listData = res);
  }

  async addData() {
    this.information.data.slug = this.slug;
    await this.dataService.addData(this.information.data);
    this.loadData();
  }
}
