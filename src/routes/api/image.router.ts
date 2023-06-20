import express from 'express';
import {
  getImagePath,
  ImageFile,
  IMAGES_FOLDER,
  resizeImage,
  THUMB_FOLDER
} from '../../utils/helper.utils';
import { existsSync } from 'fs';
import { validateThumbs } from '../middleware/thumbs.middleware';

const imageRouter = express.Router();

imageRouter.get(
  '/',
  validateThumbs,
  async (req: express.Request, res: express.Response) => {
    try {
      const { filename, width, height }: ImageFile = req.imageFile;

      const imagePath: string = getImagePath(IMAGES_FOLDER, filename);
      if (!existsSync(imagePath)) {
        return res.status(404).send(`File ${filename} is not found`);
      }

      // resize image if the width and height are greater than 0px
      const fileNameResized = `${filename}_${width}_${height}`;
      const thumbsPath: string = getImagePath(THUMB_FOLDER, fileNameResized);
      const imageFile: ImageFile = { filename, width, height };
      await resizeImage(imagePath, imageFile, thumbsPath);
      res.status(200).sendFile(thumbsPath);
    } catch (error: unknown) {
      console.log(error);
      res.status(500).send('Something is wrong');
    }
  }
);

export { imageRouter };
