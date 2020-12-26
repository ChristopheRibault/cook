import Promise from 'bluebird';
import * as Scrapers from './scrapers';

Promise.each(Object.values(Scrapers), (Scraper) => Scraper.exec('test'));
