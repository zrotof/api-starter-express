const { Sequelize } = require('sequelize');
const { db } = require('./dot-env');

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  port: db.port
});

const testDbConnection = async ()=>{
  try {
    await sequelize.authenticate().then(
      () => console.log("Connection has been established successfully.")
    )
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {sequelize , testDbConnection};