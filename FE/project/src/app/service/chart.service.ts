import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Markets } from '../model/market';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private url = 'http://localhost:3000/market';
  private url2 = ' http://localhost:3000/market';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Markets[]>{
    return this.http.get<Markets[]>(this.url)
  }

  GetAllMarket(): Observable<Markets[]>{
    return this.http.get<Markets[]>(this.url2)
  }

  FindById(id): Observable<Markets>{
    return this.http.get<Markets>(this.url+ '/' +id)
  }

  GetAllProduct(){
    return this.http.get('http://localhost:3000/product')
  }
}
