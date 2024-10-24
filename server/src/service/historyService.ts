//DONE made by me. Import fs 
import fs from 'fs/promises';

// DONE: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}


// DONE: Complete the HistoryService class
class HistoryService {
  // DONE: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile('db/searchHistory.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file.', error);
      return [];
    }
  }
  // DONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities);
      await fs.writeFile('searchHistory.json', data, 'utf8');
    } catch (error) {
      console.error('Error writing file.', error);
    }
  }
  // DONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // DONE: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string, id: string): Promise<void> {
    const cities: City[] = await this.getCities();
    cities.push(new City(name, id));
    await this.write(cities);
  }
  // * BONUS DONE: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<boolean> {
    const cities = await this.getCities();
    const index = cities.findIndex(city => city.id === id);
    if (index !== -1) {
      cities.splice(index, 1);
      await this.write(cities);
      return true;
    }
    return false;
  }
}
export default new HistoryService();
