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
      console.log('Constructor is loading data.');
  }

  ngOnInit() {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.phoneService.getDetails(this.slug).subscribe(result => {
      this.information = result;
      console.log('ngOnInit: Phone Name: ', this.information.data.phone_name);
      this.changeIcon();
    });
  }

  openWebsite() {
    window.open(this.information.data.phone_images[0], '_blank');
  }

  changeIcon() {
    console.log(`changeIcon - ${this.slug}`);
    console.log(this.listData);
    if(this.listData !== null) {
      if (this.listData.findIndex(s => s.slug === this.slug) !== -1) {
        this.ikona = 'star';
        console.log('ikona = star');
      } else {
        this.ikona = 'star-outline';
        console.log('ikona = star-outline');
      }
    }
  }

  loadData() {
    this.dataService.getData().subscribe(res => {
      this.listData = res;
      //console.log(`\nloadData: ${this.listData}`);
      this.changeIcon();
    });
  }

  async addData() {
    this.information.data.slug = this.slug;
    if (this.listData === null) {
      await this.dataService.addData(this.information.data);
      this.loadData();
    } else {
      if ((this.listData.length > 0) && (this.listData.findIndex(s => s.slug === this.information.data.slug) === -1)) {
        await this.dataService.addData(this.information.data);
        this.loadData();
      } else {
        console.log('Phone already exists in favorites. Removing.');
        const index = this.listData.findIndex(s => s.slug === this.information.data.slug);
        this.dataService.removeItem(index);
        this.listData.splice(index, 1);
        this.changeIcon();
      }
    }
  }
}
