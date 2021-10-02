const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

try {
  mongoose
    .connect(db, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then(() => console.log('Connection Successful! 🎈🤞'));
} catch (error) {
  console.log(error);
}
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} `);
});
