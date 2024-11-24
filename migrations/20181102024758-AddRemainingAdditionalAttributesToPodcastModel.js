'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('Podcasts', 'author', Sequelize.STRING),
			queryInterface.addColumn('Podcasts', 'descriptionLong', Sequelize.STRING),
			queryInterface.addColumn('Podcasts', 'descriptionShort', Sequelize.STRING),
			queryInterface.addColumn('Podcasts', 'image', Sequelize.STRING),
			queryInterface.addColumn('Podcasts', 'language', Sequelize.STRING),
			queryInterface.addColumn('Podcasts', 'link', Sequelize.STRING)
		]);
  },

  down: (queryInterface) => {
		return Promise.all([
			queryInterface.removeColumn('Podcasts', 'author'),
			queryInterface.removeColumn('Podcasts', 'descriptionLong'),
			queryInterface.removeColumn('Podcasts', 'descriptionShort'),
			queryInterface.removeColumn('Podcasts', 'image'),
			queryInterface.removeColumn('Podcasts', 'language'),
			queryInterface.removeColumn('Podcasts', 'link')
		]);
  }
};
