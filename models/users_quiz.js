
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users_quiz', {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.STRING,
        field: 'user_id',
        allowNull: true
      },
      quizId: {
        type: DataTypes.STRING,
        field: 'quiz_id',
        allowNull: true
      },
      score: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'users_quiz_pkey',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "users_quiz_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  };
  