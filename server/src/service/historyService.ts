//DONE made by me. Import fs 
import fs from 'fs';

// DONE: Define a City class with name and id properties
class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}


// DONE: Complete the HistoryService class
class HistoryService {
  // DONE: Define a read method that reads from the searchHistory.json file
  private async read() {
    const data = fs.readFileSync('searchHistory.json', 'utf8');
    return JSON.parse(data);
  }
  // DONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const data = JSON.stringify(cities);
    fs.writeFileSync('searchHistory.json', data, 'utf8');
  }
  // DONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const cities = await this.read();
    return cities;
  }
  // DONE: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string, id: number) {
    const cities: City[] = await this.getCities();
    cities.push({ name, id });
    const data = JSON.stringify(cities);
    fs.writeFileSync('searchHistory.json', data, 'utf8');
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities: City[] = await this.getCities();
    cities.pop();
    const data = JSON.stringify(cities);
    fs.writeFileSync('searchHistory.json', data, 'utf8');
  }
}

export default new HistoryService();
