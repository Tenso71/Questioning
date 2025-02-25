import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '28c1abb3404643cb82e6e48a598b7e3b';
  private apiUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getTopHeadlines(country: string = 'us', category: string = 'general'): Observable<any> {
    const url = `${this.apiUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
