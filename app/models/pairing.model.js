const { INTEGER, STRING, TEXT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Pairing = sequelize.define("pairing", {
    description: {
      type: Sequelize.TEXT
    },
    drinks: {
      type: Sequelize.TEXT
    },
    shows: {
      type: Sequelize.TEXT
    },
    books: {
      type: Sequelize.TEXT
    },
    music: {
      type: Sequelize.TEXT
    },
    decor: {
      type: Sequelize.TEXT
    },
    more: {
      type: Sequelize.TEXT
    }
  });

  return Pairing;
};