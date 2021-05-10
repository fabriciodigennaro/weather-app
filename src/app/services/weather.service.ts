import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const URL = environment.weather_url + '?city=' + city;

    return this.http.get(URL);
  }
}
