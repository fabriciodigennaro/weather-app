import { Component, OnInit } from '@angular/core';
// import { timeStamp } from 'node:console';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  urlImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtJR0vQObwhpQpZ24nSlLe-HocAXyPafFhagryo7Jg_q9aMJeiNtTTWYUrdbsQmn_I8c&usqp=CAU';
  city = '';
  temperature = 0;
  humidity = 0;
  weather = '';
  feelsLike = 0;
  pressure = 0;
  tempMin = 0;
  tempMax = 0;

  results = false;
  loading = false;
  cityNotFound = false;

  constructor(private _weatherService: WeatherService) {}

  ngOnInit(): void {}

  getMyWeather() {
    this.results = false;
    this.loading = true;

    this._weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.loading = false;
        this.results = true;

        this.temperature = Math.round(data.main.temp);
        this.humidity = data.main.humidity;
        this.weather = data.weather[0].main;
        this.feelsLike = Math.round(data.main.feels_like);
        this.pressure = data.main.pressure;
        this.tempMin = Math.round(data.main.temp_min);
        this.tempMax = Math.round(data.main.temp_max);
      },
      (error) => {
        this.loading = false;
        this.error();
      }
    );
  }

  error() {
    this.cityNotFound = true;
    setTimeout(() => {
      this.cityNotFound = false;
      this.city = '';
    }, 3000);
  }
}
