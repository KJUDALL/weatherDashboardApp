import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import { v4 as uuidv4 } from 'uuid';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    const cityName = req.body.city;
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // Save city to search history
    await HistoryService.addCity(uuidv4(), cityName);

    res.json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data.', error);
    res.status(500).json({ error: 'Failed to retrieve weather data.' });
  }
});

// GET search history
router.get('/history', async (req, res) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error reading search history data.', error);
    res.status(500).json({ error: 'Failed to retrieve search history.' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const cityId = req.params.id;
    const result = await HistoryService.removeCity(cityId);
    if (result) {
      res.json({ message: 'City deleted successfully!' });
    } else {
      res.status(404).json({ error: 'City not found.' });
    }
  } catch (error) {
    console.error('Error deleting city from search history.', error);
    res.status(500).json({ error: 'Failed to delete city from search history.' });
  }
});

export default router;
