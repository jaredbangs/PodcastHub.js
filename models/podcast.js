'use strict';
module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('Podcast', {
    RssUrl: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Podcast.associate = function(models) {
    // associations can be defined here
  };
  return Podcast;
};
