#!/bin/sh
NODE_ENV=development node_modules/.bin/sequelize db:migrate
NODE_ENV=test node_modules/.bin/sequelize db:migrate
NODE_ENV=production node_modules/.bin/sequelize db:migrate

