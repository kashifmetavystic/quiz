
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('quiz', {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userId :{
        type : DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'quiz',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "quiz_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  };
  