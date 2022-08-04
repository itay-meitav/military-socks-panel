import path from 'path';
import express from 'express';
import cors from 'cors';

if (process.env.MODE_ENV != 'production') {
  require('dotenv').config()
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
