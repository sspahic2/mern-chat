import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.get('/test', (req, res) => {
  res.status(200).json('Test working.');
})

export default {};