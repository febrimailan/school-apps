'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    TeacherId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, {through:'SubjectStudent'})
  }

  return Subject;
};
