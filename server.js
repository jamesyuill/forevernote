import express from 'express';
import fs from 'fs';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors());
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).send('all good in the hood');
});

app.get('/api/docs', (req, res) => {
  const docs = fs.readFileSync('data/docs.json', {
    encoding: 'utf-8',
  });
  res.status(200).send({ docs: JSON.parse(docs) });
});

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
