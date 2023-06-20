import express from 'express';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

export default app;
