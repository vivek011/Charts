
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DozeeService {

  constructor(private http: HttpClient) { }
  getData(){
    return this.http.get("../assets/data.json");
  }
}
