//Model describing example

const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Example extends Model{}

Example.init(
    {
        element1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        element2: {
            type : DataTypes.STRING,
            allowNull: false
        },
        element3 : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    },
    {
      sequelize,
      modelName : 'Example',
      tableName : 'Examples'
    }
  )
  
  module.exports =  {Example} ;