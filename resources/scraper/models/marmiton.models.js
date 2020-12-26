export default {

  lastPage: {
    data: {
      listItem: '.showMorePages > li',
    },
  },

  list: {
    data: {
      listItem: '.recipe-card',
      data: {
        title: '.recipe-card__title',
        link: {
          selector: '.recipe-card-link',
          attr: 'href',
        },
      },
    },
  },

  recipes: {
    title: '.main-title',
    ingredients: {
      listItem: '.recipe-ingredients__list__item',
      data: {
        name: '.ingredient',
        complement: '.recipe-ingredient__complement',
        qty: {
          selector: '.recipe-ingredient-qt',
          convert: (x) => Number(x) || null,
        },
      },
    },
    instructions: {
      listItem: '.recipe-preparation__list__item',
    },
  },
};
