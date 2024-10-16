module.exports = {
  "development": {
    "dialect": "sqlite",
    "logging": false,
    "storage": "./db.development.sqlite"
  },
  "test": {
    "dialect": "sqlite",
    "logging": false,
    "storage": ":memory:"
  },
  "production": {
    "dialect": "sqlite",
    "logging": false,
    "storage": "./db.production.sqlite"
  }
}
