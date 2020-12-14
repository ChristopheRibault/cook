import Promise from 'bluebird';
import scrapeIt from 'scrape-it';
import db from '../../../src/knex';
import Uuid from 'uuid/dist/v4';
import { marmitonModels } from '../models';

export default class MarmitonScraper {

  /**
   * Get the last page of a url
   * @param {String} url url to be scraped
   * @returns {Number} the last page
   */
  static async getLastPage (url) {

    return scrapeIt(url, marmitonModels.lastPage)
      .then(({ data }) => data.data.pop());
  }

  /**
   * Insert recipes in DB
   * @param {Object} data to be inserted in DB
   * @param {string} table table name where to insert
   */
  static async upsertRecipes(data) {

    return db('recipes')
      .insert(data)
      .onConflict('uuid')
      .merge();
  }

  static async selectOrInsertIngredient(data) {
    data.uuid = Uuid();

    return db('ingredients')
      .insert(data)
      .onConflict('name')
      .ignore()
      .then(() => {
        return db('ingredients')
          .where({ name: data.name })
          .select('uuid')
      })
      .then(data => data[0].uuid);
  }

  /**
   * Scrape details of recipes and insert ingredients, recipes and recipeIngredients
   * @param {Object[]} recipes list of recipes to srape details from
   */
  static async scrapeRecipes (recipes) {
    await Promise.map(recipes, async recipe => {
      const scrapedData = await scrapeIt(recipe.link, marmitonModels.recipes)
        .then(({ data }) => data);

      // Insert ingredients
      Promise.each(scrapedData.ingredients, (ingredient => {
        this.selectOrInsertIngredient({ name: ingredient.name })
          .then(uuid => {
            return db('recipeIngredient')
            .insert({
              uuid: Uuid(),
              ingredient_uuid: uuid,
              recipe_uuid: recipe.uuid,
              complement: ingredient.complement,
              quantity: ingredient.qty,
            });
          });
      }));
      
      return Object.assign(
        recipe,
        { 
          instructions: scrapedData.instructions.join('\n'),
          creator_uuid: null,
        },
      )
    });

    this.upsertRecipes(recipes);
  }

  /**
   * Scrape all recipes from marmiton
   */
  static async exec () {
    const types = ['entree', 'platprincipal', 'dessert', 'amusegueule', 'sauce', 'accompagnement', 'boisson'];

    Promise.each(types, async type => {
      // Count number of pages to be scraped
      const lastPage = await this.getLastPage(`https://www.marmiton.org/recettes/?type=${type}`)
      const maxIntents = 3;
      let scraped = [];
      let failedPages = [];
  
      for (let i = 0; i < lastPage; i++) {
        let intent = 0;
  
        // Retry system when scraping fails
        do {
          intent ++;
          console.log(`scraping ${type} p.${i + 1}/${lastPage} (${intent})`)
          const url = `https://www.marmiton.org/recettes/?type=${type}&page=${i + 1}`;
          scraped = await scrapeIt(url, marmitonModels.list)
            .then(({ data }) => data.data.map(
              item => Object.assign(
                item, 
                { uuid: Uuid(), origin: 'marmiton' }
              )
            ));
        } while(!scraped.length && intent < maxIntents)
  
        if (scraped.length) {
          this.scrapeRecipes(scraped);
        } else {
          failedPages.push(i + 1)
          console.log(`=== page ${i + 1} failed ===`)
        }
        scraped = [];
      }
      if (failedPages.length) console.log(`These pages failed for ${type} : ${failedPages.join('-')}`);
    });
  }

}
