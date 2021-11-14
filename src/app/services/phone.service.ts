import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  url = 'https://api-mobilespecs.azharimm.site/v2/';
  constructor(private http: HttpClient) { }

  searchData(title: string): Observable<any> {
    return this.http.get(`${this.url}search?query=${encodeURI(title)}`)
    .pipe(
      map((results: any) => {
        console.log("RAW: ", results);
        // TODO: přistupujete chybně ke struktuře API, mrknětě sem, zakomentované řádky jsou funkční.
        //  Správná API ve formátu REST JSON je objsekt, ne pole. Ve vašem return k ní ale přistupujete jako k poli.
        // console.log("RAW: ", results.data.phones);
        // return results.data.phones;
        return results['phones'];
      })
    );
  }
  getDetails(id) {
    return this.http.get(`${this.url}${id}`);
  }
}
