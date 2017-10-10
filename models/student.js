'use strict';
var validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Student.prototype.getFullname = function () {
    return this.first_name + ' ' + this.last_name
  }

// Student.associate = function(models) {
//   Student.belongsToMany(models.Subject, {through: 'SubjectStudent'})
// }


  return Student;
};
