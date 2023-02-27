const Sequelize = require('sequelize');
require('dotenv');
const fs = require('fs');
const path = require('path');
const { hashPassword } = require('../middlewares/auth');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const db = {};

let sequelize = new Sequelize({
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB}`,
  host: `${process.env.DB_HOST}`,
  dialect: "mysql",
});

// read models in models folder

fs.readdirSync(path.join(__dirname, ''))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) == '.js'
  )
  // require each model in and return in map
  .forEach((file) => {
    try {
      const model = require(path.join(__dirname, `/${file}`))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    } catch (err) {
      console.log(
        `------->>>>>>>>   Cant Create Model ${file} Due to -->>>`,
        err
      );
    }
  });

const {
  users_quiz,
  questions,
  quiz,
  users
} = db;

try {
  quiz.hasMany(questions, {
    foreignKey: 'quiz_id'
  });
  users.hasMany(quiz,{
    foreignKey: 'user_id'
  })
  
} catch (error) {
  log.info(error);
  console.log(error);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// // sync models
try {
  db.sequelize.sync({ force: false, alter: true }).then(async()=> {
    const user = await users.findOne({where:{email: 'Test@gmail.com'}})
  if(!user){
    const pass = 'Test1234'
    const hashedPass = await hashPassword(pass)
    await users.create({name : 'Test', email: 'Test@gmail.com', password: hashedPass})
  }
  })
  .catch((err)=> console.log(err))
} catch (err) {
  console.log('Cant Sync due to ----->>>> ', err);
}

module.exports = db;
