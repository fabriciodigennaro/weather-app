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
  windSpeed = 0;
  windDirection = '';

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

        this.temperature = Math.round(data.temperature);
        this.humidity = data.humidity;
        this.weather = data.weather;
        this.feelsLike = data.feels_like;
        this.pressure = data.pressure;
        this.tempMin = data.min_temperature;
        this.tempMax = data.max_temperature;
        this.windSpeed = data.wind.speed;
        this.windDirection = data.wind.direction;
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
