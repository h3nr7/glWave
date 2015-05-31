/**
 * This config will be used in the `gulp develop` task
 */
module.exports = exports = {
  "db": {
    // "name": "db",
    // "connector": "memory",
    // local mongo
    "name": "db",
    "host": "localhost",
    "database": "glWave",
    "connector": "mongodb"
  }
};

