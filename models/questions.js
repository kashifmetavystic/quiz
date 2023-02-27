
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: true
    },
    optionA: {
      type: DataTypes.STRING,
      field: 'option_A',
      allowNull: true,
      
    },
    optionB: {
      type: DataTypes.STRING,
      field: 'option_B',
      allowNull: false
    },
    optionC: {
      type: DataTypes.STRING,
      field: 'option_C',
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quizId:{
        type: DataTypes.INTEGER,
        field: 'quiz_id',
        allowNull: false
    },

  }, {
    sequelize,
    tableName: 'questions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "questions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
