import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.page.html',
  styleUrls: ['./phone-details.page.scss'],
})
export class PhoneDetailsPage implements OnInit {
  information = null;
  constructor(private activatedRoute: ActivatedRoute, private phoneService: PhoneService) { }

  ngOnInit() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.phoneService.getDetails(slug).subscribe(result => {
      this.information = result;
      console.log('Name: ', this.information.data.phone_name);
    });
  }

  openWebsite() {
    window.open(this.information.data.phone_images[0], '_blank');
  }
}
