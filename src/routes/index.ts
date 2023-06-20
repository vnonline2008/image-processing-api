import express from 'express';
import { ImageFile } from '../utils/helper.utils';
import { imageRouter } from './api/image.router';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('API routes');
});
routes.use('/images', imageRouter);

declare global {
  namespace Express {
    interface Request {
      imageFile: ImageFile;
    }
  }
}

export default routes;
