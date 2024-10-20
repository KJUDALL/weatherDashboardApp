//DONE by me: npm i dotenv and node-fetch
import dotenv from 'dotenv';
dotenv.config();
// DONE by me: Import Fetch
import fetch from 'node-fetch';
import { accessSync } from 'node:fs';

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
// DONE: Complete the WeatherService class
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
    const APIKey = this.APIKey;
    const baseURL = `${this.baseURL}/weather?q=${query}&appid=${APIKey}`;
    // variables to await fetched data and await json response
    const response = await fetch(baseURL);
    const data = await response.json()
    return data;
  };
  // DONE: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const { coord: { lon, lat } } = locationData;
    return { lon, lat };
  }
  // DONE: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/weather?q=${this.cityName}&appid=${this.APIKey}`;
  }
  // DONE: Create buildWeatherQuery method. Step 2.
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lon, lat } = coordinates;
    return `${this.baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${this.APIKey}`;
  }
  // DONE: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const queryURL = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(queryURL);
    return this.destructureLocationData(locationData);
  }
  // DONE: Create fetchWeatherData method. Step 3.
  private async fetchWeatherData(coordinates: Coordinates) {
    const queryURL = this.buildWeatherQuery(coordinates);
    const response = await fetch(queryURL);
    const weatherData = await response.json();
    return weatherData;
  }
  // DONE: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.main.temp;
    const windSpeed = response.wind.speed;
    const humidity = response.main.humidity;
    return new Weather(temperature, windSpeed, humidity);
  }
 // DONE: Complete buildForecastArray method. Step 4. 
private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
  return weatherData.map(data => {
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    return new Weather(temperature, windSpeed, humidity);
    console.log(currentWeather);
  });
}

// DONE: Complete getWeatherForCity method. Step 1. 
async getWeatherForCity(city: string): Promise<Weather> {
  this.cityName = city;
  const coordinates = await this.fetchAndDestructureLocationData();
  const weatherData = await this.fetchWeatherData(coordinates);
  const currentWeather = this.parseCurrentWeather(weatherData);
  const forecastArray = this.buildForecastArray(currentWeather, weatherData.list:any);
  return currentWeather;
  console.log(forecastArray);
}
}

export default new WeatherService(process.env.BASE_URL || 'https://api.openweathermap.org/data/2.5', process.env.API_KEY || `your_api_key`, '');
