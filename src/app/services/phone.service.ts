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
      map(results => {
        console.log("RAW: ", results);
        return results['phones'];
      })
    );
  }
  getDetails(id) {
    return this.http.get(`${this.url}${id}`);
  }
}
