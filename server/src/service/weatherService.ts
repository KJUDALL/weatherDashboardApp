//TODO by me: npm i express, dotenv, and query. Correct?
import dotenv, { configDotenv } from 'dotenv';
import { query } from 'express';
dotenv.config();
// DONE by me: Import Fetch
import fetch from 'node-fetch';

// DONE: Define an interface for the Coordinates object
interface Coordinates {
  lon: number;
  lat: number;
}
// DONE: Define a class for the Weather object
class Weather {
  temperature: number;
  windSpeed: number;
  humidity: number;

  constructor(temperature: number, windSpeed: number, humidity: number) {
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // DONE: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIKey: string;
  cityName: string;

  constructor(baseURL: string, APIKey: string, cityName: string) {
    this.baseURL = baseURL;
    this.APIKey = APIKey;
    this.cityName = cityName;
  }

  // DONE: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const APIKey = `bbb6dee2bb5cfd9e86c3b113c0c62076`;
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIKey}`;
    // variables to await fetched data and await json response
    const response = await fetch(baseURL);
    const data = await response.json()
    return data;
  };
  // DONE: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lon, lat } = locationData;
    return { lon, lat };
  }
  // DONE: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.APIKey}`;
    return queryURL;
  }
  // DONE: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lon, lat } = coordinates;
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.APIKey}`;
    return queryURL;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.APIKey}`;
    const response = await fetch(queryURL);
    const locationData = await response.json();
    const { coord: { lon, lat }, name: cityName } = locationData;
    return { lon, lat, cityName };
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {

  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {

  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

  }
}

export default new WeatherService();
