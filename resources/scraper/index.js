import Promise from 'bluebird';
import * as Scrapers from './scrapers';

for (const Scraper of Object.values(Scrapers)) {
  Promise.all(Scraper.exec());
}
