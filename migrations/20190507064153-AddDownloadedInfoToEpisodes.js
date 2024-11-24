'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('Episodes', 'shouldDownload', Sequelize.BOOLEAN),
			queryInterface.addColumn('Episodes', 'downloadedServerPath', Sequelize.STRING)
		]);
  },

  down: (queryInterface) => {
		return Promise.all([
			queryInterface.removeColumn('Episodes', 'shouldDownload'),
			queryInterface.removeColumn('Episodes', 'downloadedServerPath')
		]);
  }
};