import * as Scrapers from './scrapers';

for (const Scraper of Object.values(Scrapers)) {
  Scraper.exec();
}
