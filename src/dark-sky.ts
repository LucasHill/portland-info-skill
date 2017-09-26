import * as process from 'process';
import nodeFetch from 'node-fetch';

const apiKey = process.env.DARKSKY_API_KEY;
const location = process.env.LAT_LON || '45.523062,-122.676482';

const requestUrl = 
  `https://api.darksky.net/forecast/${apiKey}/${location}`;

export interface darkSky {
  isSnowingNow: () => Promise<any>;
}

// Minimal api shape for 'currently' object
export interface darkSkyCurrently {
  time: number;
  summary: string;
  icon: string;
}

// Minimal api shape for dark sky response
export interface darkSkyResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  currently: darkSkyCurrently;
}

const darkSky: darkSky = {
  isSnowingNow(): Promise<any> {
    return new Promise((resolve, reject) => {
      nodeFetch(requestUrl)
        .then(res => res.json())
        .then((json: darkSkyResponse) => {
          const icon = json.currently.icon;
          resolve(icon === 'snow');
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  },
};

export default darkSky;
