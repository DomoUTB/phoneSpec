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
  ikona = 'star-outline';
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
      this.changeIcon();
    });
  }

  openWebsite() {
    window.open(this.information.data.phone_images[0], '_blank');
  }

  changeIcon() {
    console.log(`changeIcon - ${this.slug}`);
    console.log(this.listData);

    if (this.listData.findIndex(s => s.slug === this.slug) !== -1) {
      this.ikona = 'star';
      console.log('ikona = star');
    } else {
      this.ikona = 'star-outline';
      console.log('ikona = star-outline');
    }
  }

  async loadData() {
    this.dataService.getData().subscribe(res => this.listData = res);
    this.changeIcon();
  }

  async addData() {
    this.information.data.slug = this.slug;
    if ((this.listData.length > 0) && (this.listData.findIndex(s => s.slug === this.information.data.slug) === -1)) {
      await this.dataService.addData(this.information.data);
      await this.loadData();
      this.ikona = 'star';
    } else {
      console.log('Phone already exists in favorites.');
      this.changeIcon();
    }
  }
}
