'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    SubjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Teacher.prototype.getFullname = function() {
    return this.first_name + ' ' + this.last_name
  }

  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  }

  return Teacher;
};
