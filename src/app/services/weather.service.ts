import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather?&appid=';
  key = '83cd2580ff4825eef974fe95dbd29023';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const URL = this.url + this.key + '&q=' + city + '&units=metric';

    return this.http.get(URL);
  }
}
